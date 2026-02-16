package com.codewith.firstApp.controllers;

import com.codewith.firstApp.models.Person;
import com.codewith.firstApp.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class SignupController {
    
    @Autowired
    private PersonRepository personRepository;

    // Display the signup form (for traditional form submission)
    @GetMapping("/signup")
    public String showSignupForm() {
        return "signup";
    }

    // Handle form submission (for traditional form submission)
    @PostMapping("/signup")
    public String saveSignup(@RequestParam String name, 
                             @RequestParam String email,
                             RedirectAttributes redirectAttributes) {
        
        // Create a new Person object with name and email
        Person person = new Person(name, email);
        
        // Save to database
        personRepository.save(person);
        
        // Redirect to success page with a message
        redirectAttributes.addFlashAttribute("message", "Signup successful! Welcome " + name);
        
        return "redirect:/signup-success";
    }

    // Display success message
    @GetMapping("/signup-success")
    public String showSuccessPage() {
        return "success";
    }
}
