package com.codewith.firstApp.controllers;

import com.codewith.firstApp.dtos.AuthRequest;
import com.codewith.firstApp.dtos.AuthResponse;
import com.codewith.firstApp.dtos.UserDTO;
import com.codewith.firstApp.models.Person;
import com.codewith.firstApp.repositories.PersonRepository;
import com.codewith.firstApp.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    
    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AuthRequest authRequest) {
        try {
            // Check if user already exists
            Optional<Person> existingUser = personRepository.findByEmail(authRequest.getEmail());
            if (existingUser.isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "User with this email already exists");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Create new user
            Person person = new Person();
            person.setName(authRequest.getName());
            person.setEmail(authRequest.getEmail());
            person.setPassword(passwordEncoder.encode(authRequest.getPassword()));

            Person savedPerson = personRepository.save(person);

            // Generate JWT token
            String token = jwtTokenProvider.generateToken(savedPerson.getId().toString());

            UserDTO userDTO = new UserDTO(savedPerson.getId(), savedPerson.getName(), savedPerson.getEmail());
            AuthResponse response = new AuthResponse(token, userDTO, "Signup successful!");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error during signup: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            // Find user by email
            Optional<Person> user = personRepository.findByEmail(authRequest.getEmail());
            if (!user.isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            Person person = user.get();

            // Verify password
            if (!passwordEncoder.matches(authRequest.getPassword(), person.getPassword())) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Generate JWT token
            String token = jwtTokenProvider.generateToken(person.getId().toString());

            UserDTO userDTO = new UserDTO(person.getId(), person.getName(), person.getEmail());
            AuthResponse response = new AuthResponse(token, userDTO, "Login successful!");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error during login: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String bearerToken) {
        try {
            String token = bearerToken.substring(7); // Remove "Bearer " prefix
            String userId = jwtTokenProvider.getUserIdFromToken(token);

            Optional<Person> person = personRepository.findById(Long.parseLong(userId));
            if (!person.isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Person user = person.get();
            UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail());
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error retrieving user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
