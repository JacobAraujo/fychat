package com.jacob_araujo.fychat_api.web.controller;

import com.jacob_araujo.fychat_api.dto.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    @MessageMapping("/sendMessage/{tokenLink}")
    @SendTo("/topic/group/{tokenLink}")
    public Message sendMessage(@DestinationVariable String tokenLink , Message message) {
        message.setTimestamp(java.time.LocalDateTime.now());
        return message;
    }
}

