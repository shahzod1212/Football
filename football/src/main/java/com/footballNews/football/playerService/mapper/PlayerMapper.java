package com.footballNews.football.playerService.mapper;

import com.footballNews.football.playerService.domain.Player;
import com.footballNews.football.playerService.dtos.PlayerDto;
import com.footballNews.football.playerService.dtos.PlayerRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlayerMapper {
    Player toEntity(PlayerRequest playerRequest);

    @Mapping(target = "clubId", source = "club.id")
    PlayerDto toDto(Player player);
}
