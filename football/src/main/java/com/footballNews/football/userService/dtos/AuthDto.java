package com.footballNews.football.userService.dtos;

import com.footballNews.football.userService.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthDto {
    private String accessToken;
    private String refreshToken;
    private User user;
}
