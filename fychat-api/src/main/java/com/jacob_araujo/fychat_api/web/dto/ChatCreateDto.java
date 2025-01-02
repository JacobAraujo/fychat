package com.jacob_araujo.fychat_api.web.dto;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter @ToString
public class ChatCreateDto {
    private String chatName;
    private Boolean chatType;
}
