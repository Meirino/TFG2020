package com.meirino.TFG.repositories;

import com.meirino.TFG.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}
