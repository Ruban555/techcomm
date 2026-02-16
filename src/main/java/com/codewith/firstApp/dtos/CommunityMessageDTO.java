package com.codewith.firstApp.dtos;

import java.time.LocalDateTime;

public class CommunityMessageDTO {
    private Long id;
    private Long communityId;
    private Long senderId;
    private String senderName;
    private String messageText;
    private LocalDateTime sentAt;
    private Boolean isEdited;

    public CommunityMessageDTO() {
    }

    public CommunityMessageDTO(Long id, Long communityId, Long senderId, String senderName, String messageText, LocalDateTime sentAt, Boolean isEdited) {
        this.id = id;
        this.communityId = communityId;
        this.senderId = senderId;
        this.senderName = senderName;
        this.messageText = messageText;
        this.sentAt = sentAt;
        this.isEdited = isEdited;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCommunityId() {
        return communityId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public Boolean getIsEdited() {
        return isEdited;
    }

    public void setIsEdited(Boolean isEdited) {
        this.isEdited = isEdited;
    }
}
