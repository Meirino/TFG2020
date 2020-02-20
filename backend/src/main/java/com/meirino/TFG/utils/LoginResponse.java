package com.meirino.TFG.utils;

import com.fasterxml.jackson.annotation.JsonView;
import com.meirino.TFG.entities.User;
import com.meirino.TFG.restControllers.RestUserController;

public class LoginResponse {

    public interface loginView extends User.userLogin {};

    @JsonView(loginView.class)
    private String token;

    @JsonView(User.userLogin.class)
    private User user;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public LoginResponse() {}

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
