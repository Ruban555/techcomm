package com.codewith.firstApp.repositories;

import com.codewith.firstApp.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

}
