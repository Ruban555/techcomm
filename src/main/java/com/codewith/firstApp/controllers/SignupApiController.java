package com.codewith.firstApp.controllers;

import com.codewith.firstApp.models.Person;
import com.codewith.firstApp.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SignupApiController {
    
    @Autowired
    private PersonRepository personRepository;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signupUser(@RequestBody Person person) {
        try {
            // Save the person to the database
            Person savedPerson = personRepository.save(person);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Signup successful! Welcome " + person.getName());
            response.put("id", savedPerson.getId().toString());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error during signup: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(personRepository.findAll());
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching users: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
