package com.footballNews.football.userService.mapper;

import com.footballNews.football.userService.domain.User;
import com.footballNews.football.userService.dtos.LoginUser;
import com.footballNews.football.userService.dtos.UserRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(UserRequest userRequest);

    User toEntity(LoginUser user);
}
