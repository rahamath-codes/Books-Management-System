package com.rahamathcodes.Books_Management.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rahamathcodes.Books_Management.dto.LoginDTO;
import com.rahamathcodes.Books_Management.dto.UserDTO;
import com.rahamathcodes.Books_Management.models.Role;
import com.rahamathcodes.Books_Management.models.Users;
import com.rahamathcodes.Books_Management.repository.FavoriteRepository;
import com.rahamathcodes.Books_Management.repository.UsersRepository;

@Service
public class UserService {

    UsersRepository userRepo;
    
    @Autowired
    FavoriteService favService;
    

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UsersRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Adds a new user after encoding their password
    public void addUser(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    // Retrieves a user by email
    public Optional<Users> getUserByEmail(String email) {
        return userRepo.findByUserEmail(email);
    }

    // Retrieves the role of a user using their email
    public Role getRoleByEmail(String email) {
        Optional<Users> userOpt = userRepo.findByUserEmail(email);
        return userOpt.map(Users::getRole).orElse(null);
    }
    
    //Retrieves a user by id
    public Optional<Users> getUserById(int id) {
        return userRepo.findById(id);
    }

    
    // Returns a list of all users as UserDTO (excluding password)
    public List<UserDTO> getAllUsers() {
        List<Users> users = userRepo.findAll();
        List<UserDTO> dtoList = new ArrayList<>();

        for (Users user : users) {
            dtoList.add(new UserDTO(
                user.getUserId(),
                user.getUserName(),
                user.getUserEmail(),
                user.getRole()
            ));
        }
        return dtoList;
    }

    // Updates user details, including password if provided
    public void updateUser(int id, Users updatedUser) {
        Users user = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setUserName(updatedUser.getUserName());
        user.setUserEmail(updatedUser.getUserEmail());
        user.setRole(updatedUser.getRole());

        // Only update password if a new one is provided
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        userRepo.save(user);
    }

    // Deletes a user by ID
    public void deleteUser(int id) {
    	favService.deleteAllFavoritesByUserId(id);
        userRepo.deleteById(id);
    }

    // Validates user credentials by comparing password with encoded one
    public boolean authenticateUser(LoginDTO loginDTO) {
        Optional<Users> userOptional = userRepo.findByUserEmail(loginDTO.getUserEmail());
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            return passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
        }
        return false;
    }

}
