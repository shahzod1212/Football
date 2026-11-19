package com.footballNews.football.clubService.mapper;

import com.footballNews.football.clubService.domain.Club;
import com.footballNews.football.clubService.dtos.ClubDto;
import com.footballNews.football.clubService.dtos.ClubRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClubMapper {

    Club toEntity(ClubRequest clubRequest);

    ClubDto toDto(Club club);
}
