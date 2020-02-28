package com.meirino.TFG.utils;

public class PassForm {
    private String token;
    private int id;
    private String password;

    public PassForm(String token, int id, String password) {
        this.token = token;
        this.id = id;
        this.password = password;
    }

    public PassForm() {}

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
