package com.jacob_araujo.fychat_api.web.controller;

import com.jacob_araujo.fychat_api.entity.Chat;
import com.jacob_araujo.fychat_api.service.ChatService;
import com.jacob_araujo.fychat_api.web.dto.ChatCreateDto;
import com.jacob_araujo.fychat_api.web.dto.ChatResponseDto;
import com.jacob_araujo.fychat_api.web.dto.mapper.ChatMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatRestController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/groups")
    public ResponseEntity<ChatResponseDto> create(@RequestBody ChatCreateDto dto) {
        Chat group = ChatMapper.toChat(dto);
        Chat groupCreated = chatService.createGroup(group);
        return ResponseEntity.ok(ChatMapper.toDto(groupCreated));
    }

    @GetMapping("/public-groups")
    public List<ChatResponseDto> getPublicGroups() {
        List<Chat> chats = chatService.getPublicGroups();
        return ChatMapper.toListDto(chats);
    }
}

