package com.footballNews.football.userService.service.Impl;

import com.footballNews.football.userService.domain.User;
import com.footballNews.football.userService.dtos.AuthDto;
import com.footballNews.football.userService.dtos.LoginUser;
import com.footballNews.football.userService.dtos.UserRequest;
import com.footballNews.football.userService.jwt.JwtUtils;
import com.footballNews.football.userService.mapper.UserMapper;
import com.footballNews.football.userService.repository.UserRepository;
import com.footballNews.football.userService.service.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthDto registerUser(UserRequest userRequest) {
        User user = userMapper.toEntity(userRequest);
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        String accessToken = jwtUtils.generateToken(user.getEmail());
        String refreshToken = jwtUtils.refreshToken(user.getEmail());
        user.setRefreshToken(refreshToken);

        User saved = userRepository.save(user);

        AuthDto dto = new AuthDto();
        dto.setAccessToken(accessToken);
        dto.setRefreshToken(refreshToken);
        dto.setUser(saved);
        return dto;
    }

    @Override
    public AuthDto loginUser(LoginUser loginUser) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getEmail(),
                        loginUser.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginUser.getEmail());
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        String accessToken = jwtUtils.generateToken(user.getEmail());
        String refreshToken = jwtUtils.refreshToken(user.getEmail());
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        AuthDto dto = new AuthDto();
        dto.setAccessToken(accessToken);
        dto.setRefreshToken(refreshToken);
        dto.setUser(user);
        return dto;
    }

    public AuthDto refresh(String refreshToken) {
        if (!jwtUtils.isValidToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        if (!"refresh".equals(jwtUtils.getType(refreshToken))) {
            throw new RuntimeException("Not a refresh token");
        }

        String email = jwtUtils.extractEmail(refreshToken);
        User user = userRepository.findByEmail(email);

        if (user == null || !refreshToken.equals(user.getRefreshToken())) {
            throw new RuntimeException("Refresh token not found");
        }

        String newAccessToken = jwtUtils.generateToken(email);

        AuthDto dto = new AuthDto();
        dto.setAccessToken(newAccessToken);
        dto.setRefreshToken(refreshToken);
        dto.setUser(user);
        return dto;
    }
}