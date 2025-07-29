package com.rahamathcodes.Books_Management.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfigs {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	http
    	.cors(cors -> cors.configurationSource(request -> {
    	    CorsConfiguration corsConfig = new CorsConfiguration();
    	    corsConfig.setAllowedOrigins(List.of("http://localhost:4200"));
    	    corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    	    corsConfig.setAllowedHeaders(List.of("*"));
    	    corsConfig.setAllowCredentials(true); 
    	    return corsConfig;
    	}))
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll()
        )
        .httpBasic(withDefaults());
        return http.build();
    }
}
