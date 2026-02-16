package com.codewith.firstApp.repositories;

import com.codewith.firstApp.models.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByIsActiveTrue();
    
    List<Community> findByCategoryAndIsActiveTrue(String category);
    
    Optional<Community> findByNameAndIsActiveTrue(String name);
    
    List<Community> findByCreatedByAndIsActiveTrue(Long createdBy);
    
    List<Community> findAll();
}
