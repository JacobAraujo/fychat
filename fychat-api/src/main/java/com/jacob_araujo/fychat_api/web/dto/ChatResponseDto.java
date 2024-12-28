package com.jacob_araujo.fychat_api.web.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatResponseDto {
    private Long id;
    private String chatName;
}