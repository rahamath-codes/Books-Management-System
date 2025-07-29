package com.rahamathcodes.Books_Management.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rahamathcodes.Books_Management.dto.LoginDTO;
import com.rahamathcodes.Books_Management.dto.UserDTO;
import com.rahamathcodes.Books_Management.models.Users;
import com.rahamathcodes.Books_Management.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/readit/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Register a new user
    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody Users user) {
        logger.info("Adding a new user: {}", user.getUserEmail());
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User Added Successfully!");
    }

    // Get all users
    @GetMapping
    public List<UserDTO> getAllUsers() {
        logger.info("Fetching all users");
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable int id) {
        logger.info("Fetching user by ID: {}", id);
        Optional<Users> userOpt = userService.getUserById(id);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            UserDTO dto = new UserDTO(
                    user.getUserId(),
                    user.getUserName(),
                    user.getUserEmail(),
                    user.getRole()
            );
            return ResponseEntity.ok(dto);
        } else {
            logger.warn("User not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        logger.info("Login attempt for email: {}", loginDTO.getUserEmail());
        Optional<Users> userOpt = userService.getUserByEmail(loginDTO.getUserEmail());

        if (userOpt.isPresent()) {
            Users user = userOpt.get();

            if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
                logger.info("Login successful for user: {}", user.getUserEmail());
                Map<String, Object> response = new HashMap<>();
                response.put("userName", user.getUserName());
                response.put("id", user.getUserId());
                response.put("email", user.getUserEmail());
                response.put("role", user.getRole().name());
                return ResponseEntity.ok(response);
            } else {
                logger.warn("Password mismatch for user: {}", user.getUserEmail());
            }
        } else {
            logger.warn("User not found with email: {}", loginDTO.getUserEmail());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid email or password."));
    }

    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updateUser(@PathVariable int id, @RequestBody Users updatedUser) {
        logger.info("Updating user with ID: {}", id);
        userService.updateUser(id, updatedUser);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User updated successfully!");
        return ResponseEntity.ok(response);
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable int id) {
        logger.info("Deleting user with ID: {}", id);
        userService.deleteUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully!");
        return ResponseEntity.ok(response);
    }
}
