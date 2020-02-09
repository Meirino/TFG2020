package com.meirino.TFG.restControllers;

import com.meirino.TFG.entities.User;
import com.meirino.TFG.services.UserService;
import com.meirino.TFG.utils.RegistrationFields;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class RestUserController {

    private final UserService userService;

    @Autowired
    public RestUserController(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void init() {}

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<User> allUsers () {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<User> register(@RequestBody RegistrationFields registerForm) {
        this.userService.register(new User(registerForm.getEmail(), registerForm.getPassword(), registerForm.getUsername(), ""));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
