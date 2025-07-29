package com.rahamathcodes.Books_Management.dto;

import com.rahamathcodes.Books_Management.models.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	 private int userId;
	    private String userName;
	    private String userEmail;
	    private Role role;
}
