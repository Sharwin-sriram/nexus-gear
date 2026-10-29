package com.nexusgear.controller;

import com.nexusgear.dto.AuthRequest;
import com.nexusgear.dto.AuthResponse;
import com.nexusgear.dto.RegisterRequest;
import com.nexusgear.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam String email) {
        return authService.getUserByEmail(email)
                .map(u -> ResponseEntity.ok(java.util.Map.of(
                        "name", u.getName(),
                        "email", u.getEmail(),
                        "role", u.getRole()
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}
