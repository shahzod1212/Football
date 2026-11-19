package com.footballNews.football.userService.service;

import com.footballNews.football.userService.dtos.AuthDto;
import com.footballNews.football.userService.dtos.LoginUser;
import com.footballNews.football.userService.dtos.UserRequest;

public interface UserService {
    AuthDto registerUser(UserRequest userRequest);

    AuthDto loginUser(LoginUser loginUser);
    AuthDto refresh(String token);
}
