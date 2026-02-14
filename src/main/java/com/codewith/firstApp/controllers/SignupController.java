package com.codewith.firstApp.controllers;

import com.codewith.firstApp.models.Person;
import com.codewith.firstApp.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class SignupController {
    
    @Autowired
    private PersonRepository personRepository;

    // Display the signup form
    @GetMapping("/signup")
    public String showSignupForm() {
        return "signup";
    }

    // Handle form submission
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
