package com.codewith.firstApp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codewith.firstApp.models.Person;
import com.codewith.firstApp.repositories.PersonRepository;

@RestController
@RequestMapping("/api/user")
public class HelloController {
    
    @Autowired
    private PersonRepository personRepository;

    @GetMapping("/h")
    public String hello(){
        return "Hello World";
    }

    @GetMapping("/v")
    public String wow(){
        return "Wow";
    } 

    @PostMapping("/p/{id}")
    public String post(@PathVariable String id){
        return "Post Request for ID: " + id;
    }

    @PostMapping("/person")
    public Person createPerson(@RequestParam String name){
        Person person = new Person(name, null);
        return personRepository.save(person);
    }

    @PostMapping("/create/{name}/{email}")
    public Person createPersonByPath(@PathVariable String name, @PathVariable String email){
        Person person = new Person(name, email);
        return personRepository.save(person);
    }

    @GetMapping("/getall")
    public Iterable<Person> getAllPersons(){
        return personRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Person getPersonById(@PathVariable Long id){
        return personRepository.findById(id).orElse(null);
    }

    @PutMapping("/update/{id}")
    public Person updatePerson(@PathVariable Long id, @RequestParam String name){
        Person person = personRepository.findById(id).orElse(null);
        if (person != null) {
            person.setName(name);
            return personRepository.save(person);
        }
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public String deletePerson(@PathVariable Long id){
        personRepository.deleteById(id);
        return "Person with ID " + id + " deleted.";
    }
    
}
