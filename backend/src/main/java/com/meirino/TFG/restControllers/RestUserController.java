package com.meirino.TFG.restControllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.meirino.TFG.entities.User;
import com.meirino.TFG.services.UserService;
import com.meirino.TFG.utils.LoginFields;
import com.meirino.TFG.utils.LoginResponse;
import com.meirino.TFG.utils.RegistrationFields;
import com.meirino.TFG.utils.UserEditForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class RestUserController {

    protected interface userView extends LoginResponse.loginView {};

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
        try {
            this.userService.register(new User(registerForm.getEmail(), registerForm.getPassword(), registerForm.getUsername(), ""));
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @JsonView(userView.class)
    public ResponseEntity<LoginResponse> login(@RequestBody LoginFields loginForm) {
        try {
            String uuid = UUID.randomUUID().toString();
            LoginResponse lr = this.userService.login(uuid, loginForm.getEmail(), loginForm.getPassword());
            return new ResponseEntity<>(lr, HttpStatus.OK);
        } catch (NullPointerException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/editUser", method = RequestMethod.PUT)
    @JsonView(userView.class)
    // TODO: File upload
    public ResponseEntity<Boolean> editUser(@RequestBody UserEditForm editForm) {
        try {
            if (this.userService.tokenExists(editForm.getToken())) {
                boolean result = this.userService.editUser(editForm.getEmail(), editForm.getUsername());
                if(result) {
                    return new ResponseEntity<>(true, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
            }
        } catch (NullPointerException | IllegalAccessException e) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/editPass", method = RequestMethod.PUT)
    @JsonView(userView.class)
    // TODO: Cambiar contraseña
    public ResponseEntity<Boolean> editPass(@RequestBody LoginFields loginForm) {
        try {
            String uuid = UUID.randomUUID().toString();
            LoginResponse lr = this.userService.login(uuid, loginForm.getEmail(), loginForm.getPassword());
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (NullPointerException | IllegalAccessException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
