package com.codewith.firstApp.repositories;

import com.codewith.firstApp.models.CommunityMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityMessageRepository extends JpaRepository<CommunityMessage, Long> {
    List<CommunityMessage> findByCommunityIdOrderBySentAtDesc(Long communityId);
    
    List<CommunityMessage> findBySenderIdOrderBySentAtDesc(Long senderId);
    
    List<CommunityMessage> findAllByOrderBySentAtDesc();
}
