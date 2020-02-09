package com.meirino.TFG.services;

import com.meirino.TFG.entities.User;
import com.meirino.TFG.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

//    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public UserService(
//            PasswordEncoder passwordEncoder,
            UserRepository userRepository
    ) {
//        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public User register(User user) {

        // Modificaciones básicas
        user.setMfa_activated(false);
//        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Guardar el usuario en base de datos
        this.userRepository.save(user);
        return user;
    }
}
