package com.meirino.TFG.entities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Users", uniqueConstraints={
        @UniqueConstraint(columnNames = {"id", "email"})
})


public class User {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String username;

    @Column
    private LocalDateTime created;

    @Column
    private LocalDateTime updated;

    @Column
    private String avatar_url;

    @Column(nullable = false)
    private boolean mfa_activated;

    public User(String email, String password, String username, String avatar_url) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.avatar_url = avatar_url;
        this.mfa_activated = false;
        this.created = LocalDateTime.now();
        this.updated = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(LocalDateTime updated) {
        this.updated = updated;
    }

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }

    public boolean isMfa_activated() {
        return mfa_activated;
    }

    public void setMfa_activated(boolean mfa_activated) {
        this.mfa_activated = mfa_activated;
    }
}
