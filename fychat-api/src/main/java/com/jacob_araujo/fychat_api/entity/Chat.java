package com.jacob_araujo.fychat_api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @ToString
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ChatType chatType;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "link_token", nullable = false, length = 255)
    private String linkToken;

    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt = LocalDateTime.now().plusHours(1);

    public enum ChatType {
        PRIVATE, PUBLIC
    }
}
