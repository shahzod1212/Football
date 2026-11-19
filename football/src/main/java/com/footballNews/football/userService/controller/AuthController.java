package com.footballNews.football.userService.controller;

import com.footballNews.football.userService.dtos.AuthDto;
import com.footballNews.football.userService.dtos.LoginUser;
import com.footballNews.football.userService.dtos.UserRequest;
import com.footballNews.football.userService.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthDto> register(
            @RequestBody UserRequest userRequest
            ){
        AuthDto dto = userService.registerUser(userRequest);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDto> login(
            @RequestBody LoginUser loginUser
            ){
        AuthDto dto  =userService.loginUser(loginUser);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthDto> refreshToken(
            @RequestBody Map<String, String> body
            ){
        String refreshToken = body.get("refreshToken");

        AuthDto dto  = userService.refresh(refreshToken);

        return ResponseEntity.ok(dto);
    }
}
