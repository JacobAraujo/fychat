package com.jacob_araujo.fychat_api.service;

import com.jacob_araujo.fychat_api.entity.Chat;
import com.jacob_araujo.fychat_api.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    public Chat createGroup(Chat group) {

        String linkToken = UUID.randomUUID().toString();
        group.setLinkToken(linkToken);

        group.setExpiresAt(LocalDateTime.now().plusHours(1));

        return chatRepository.save(group);
    }

    public void deleteExpiredGroups() {
        List<Chat> expiredGroups = chatRepository.findByExpiresAtAfter(LocalDateTime.now());
        chatRepository.deleteAll(expiredGroups);
    }

    public List<Chat> getPublicGroups() {
        return chatRepository.findByChatType(Chat.ChatType.PUBLIC);
    }
}

