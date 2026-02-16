package com.codewith.firstApp.dtos;

import java.time.LocalDateTime;

public class CommunityDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Long createdBy;
    private LocalDateTime createdAt;
    private Long memberCount;
    private Boolean isActive;

    public CommunityDTO() {
    }

    public CommunityDTO(Long id, String name, String description, String category, Long createdBy, LocalDateTime createdAt, Long memberCount, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.memberCount = memberCount;
        this.isActive = isActive;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(Long memberCount) {
        this.memberCount = memberCount;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
