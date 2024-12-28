package com.jacob_araujo.fychat_api.repository;

import com.jacob_araujo.fychat_api.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByExpiresAtAfter(LocalDateTime now);

    List<Chat> findByChatType(Chat.ChatType chatType);
}

