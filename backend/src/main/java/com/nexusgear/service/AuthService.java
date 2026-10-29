package com.nexusgear.service;

import com.nexusgear.dto.AuthRequest;
import com.nexusgear.dto.AuthResponse;
import com.nexusgear.dto.RegisterRequest;
import com.nexusgear.model.User;
import com.nexusgear.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // In production, use BCryptPasswordEncoder
        user.setRole(req.getRole() != null ? req.getRole() : "CUSTOMER");

        userRepository.save(user);

        String mockJwt = "nxt_" + UUID.randomUUID().toString().replace("-", "");
        return new AuthResponse(mockJwt, user.getName(), user.getEmail(), user.getRole());
    }

    public AuthResponse login(AuthRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials or user not found"));

        if (!user.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String mockJwt = "nxt_" + UUID.randomUUID().toString().replace("-", "");
        return new AuthResponse(mockJwt, user.getName(), user.getEmail(), user.getRole());
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
