package com.jacob_araujo.fychat_api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Message {
    private String sender;
    private String content;
    private LocalDateTime timestamp;
}

