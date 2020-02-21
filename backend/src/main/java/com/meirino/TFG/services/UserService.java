package com.meirino.TFG.services;

import com.meirino.TFG.entities.User;
import com.meirino.TFG.repositories.UserRepository;
import com.meirino.TFG.utils.LoginResponse;
import com.meirino.TFG.utils.StringRedisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.validation.constraints.Null;
import java.util.List;

@Service
public class UserService {

//    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private StringRedisRepository redisRepository;

    @Autowired
    public UserService(
//            PasswordEncoder passwordEncoder,
            StringRedisRepository redisRepository,
            UserRepository userRepository
    ) {
//        this.passwordEncoder = passwordEncoder;
        this.redisRepository = redisRepository;
        this.userRepository = userRepository;
    }
    @PostConstruct
    public void init(){
        this.userRepository.save(new User("jjmeirino@gmail.com", "6121994spore", "Meirino", ""));
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

    public LoginResponse login(String uuid, String email, String pass) throws NullPointerException, IllegalAccessException {
        try {
            // Encontrar usuario por email
            User user = this.userRepository.findByEmail(email);
            // Comparar contraseñas
            if(user.getPassword().equals(pass)) {
                // Añadir a Redis
                this.redisRepository.add(uuid, user.toString());
                return new LoginResponse(uuid, user);
            } else {
                throw new IllegalAccessException();
            }
        } catch (Exception e) {
            throw  e;
        }
    }
}
