package com.codewith.firstApp.controllers;

import com.codewith.firstApp.dtos.CommunityMessageDTO;
import com.codewith.firstApp.models.CommunityMessage;
import com.codewith.firstApp.repositories.CommunityMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class CommunityMessageController {

    @Autowired
    private CommunityMessageRepository messageRepository;

    // Create a new message
    @PostMapping
    public ResponseEntity<?> createMessage(@RequestBody CommunityMessageDTO messageDTO) {
        try {
            CommunityMessage message = new CommunityMessage(
                messageDTO.getCommunityId(),
                messageDTO.getSenderId(),
                messageDTO.getSenderName(),
                messageDTO.getMessageText()
            );
            
            CommunityMessage savedMessage = messageRepository.save(message);
            return ResponseEntity.ok(convertToDTO(savedMessage));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating message: " + e.getMessage());
        }
    }

    // Get all messages
    @GetMapping
    public ResponseEntity<?> getAllMessages() {
        try {
            List<CommunityMessage> messages = messageRepository.findAllByOrderBySentAtDesc();
            List<CommunityMessageDTO> dtos = messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching messages: " + e.getMessage());
        }
    }

    // Get messages by community ID
    @GetMapping("/community/{communityId}")
    public ResponseEntity<?> getMessagesByCommunity(@PathVariable Long communityId) {
        try {
            List<CommunityMessage> messages = messageRepository.findByCommunityIdOrderBySentAtDesc(communityId);
            List<CommunityMessageDTO> dtos = messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching messages: " + e.getMessage());
        }
    }

    // Get messages by sender ID
    @GetMapping("/sender/{senderId}")
    public ResponseEntity<?> getMessagesBySender(@PathVariable Long senderId) {
        try {
            List<CommunityMessage> messages = messageRepository.findBySenderIdOrderBySentAtDesc(senderId);
            List<CommunityMessageDTO> dtos = messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching messages: " + e.getMessage());
        }
    }

    // Delete message
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        try {
            messageRepository.deleteById(id);
            return ResponseEntity.ok("Message deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting message: " + e.getMessage());
        }
    }

    private CommunityMessageDTO convertToDTO(CommunityMessage message) {
        return new CommunityMessageDTO(
            message.getId(),
            message.getCommunityId(),
            message.getSenderId(),
            message.getSenderName(),
            message.getMessageText(),
            message.getSentAt(),
            message.getIsEdited()
        );
    }
}
