package com.codewith.firstApp.controllers;

import com.codewith.firstApp.dtos.CommunityDTO;
import com.codewith.firstApp.models.Community;
import com.codewith.firstApp.repositories.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/communities")
@CrossOrigin(origins = "http://localhost:3000")
public class CommunityController {

    @Autowired
    private CommunityRepository communityRepository;

    // Create a new community
    @PostMapping
    public ResponseEntity<?> createCommunity(@RequestBody CommunityDTO communityDTO) {
        try {
            Community community = new Community(
                communityDTO.getName(),
                communityDTO.getDescription(),
                communityDTO.getCategory(),
                1L // createdBy - should be extracted from JWT token in real app
            );
            
            Community savedCommunity = communityRepository.save(community);
            return ResponseEntity.ok(convertToDTO(savedCommunity));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating community: " + e.getMessage());
        }
    }

    // Get all active communities
    @GetMapping
    public ResponseEntity<?> getAllCommunities() {
        try {
            List<Community> communities = communityRepository.findByIsActiveTrue();
            List<CommunityDTO> dtos = communities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching communities: " + e.getMessage());
        }
    }

    // Get communities by category
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getCommunityByCategory(@PathVariable String category) {
        try {
            List<Community> communities = communityRepository.findByCategoryAndIsActiveTrue(category);
            List<CommunityDTO> dtos = communities.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching communities: " + e.getMessage());
        }
    }

    // Get community by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCommunityById(@PathVariable Long id) {
        try {
            return communityRepository.findById(id)
                .map(community -> ResponseEntity.ok(convertToDTO(community)))
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching community: " + e.getMessage());
        }
    }

    // Update community
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCommunity(@PathVariable Long id, @RequestBody CommunityDTO communityDTO) {
        try {
            return communityRepository.findById(id)
                .map(community -> {
                    community.setName(communityDTO.getName());
                    community.setDescription(communityDTO.getDescription());
                    community.setCategory(communityDTO.getCategory());
                    Community updated = communityRepository.save(community);
                    return ResponseEntity.ok(convertToDTO(updated));
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating community: " + e.getMessage());
        }
    }

    // Delete (soft delete) community
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCommunity(@PathVariable Long id) {
        try {
            return communityRepository.findById(id)
                .map(community -> {
                    community.setIsActive(false);
                    communityRepository.save(community);
                    return ResponseEntity.ok("Community deleted successfully");
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting community: " + e.getMessage());
        }
    }

    private CommunityDTO convertToDTO(Community community) {
        return new CommunityDTO(
            community.getId(),
            community.getName(),
            community.getDescription(),
            community.getCategory(),
            community.getCreatedBy(),
            community.getCreatedAt(),
            community.getMemberCount(),
            community.getIsActive()
        );
    }
}
