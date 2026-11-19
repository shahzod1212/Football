package com.footballNews.football.matchService.mapper;

import com.footballNews.football.matchService.domain.Match;
import com.footballNews.football.matchService.dtos.MatchDto;
import com.footballNews.football.matchService.dtos.MatchRequest;
import com.footballNews.football.playerService.domain.Player;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MatchMapper {

    // DTO → Entity
    @Mapping(target = "homeClub.id", source = "homeClubId")
    @Mapping(target = "awayClub.id", source = "awayClubId")
    @Mapping(target = "goalScorers", ignore = true)
    @Mapping(target = "yellowCardPlayers", ignore = true)
    @Mapping(target = "redCardPlayers", ignore = true)
    Match toEntity(MatchRequest matchRequest);

    // Entity → DTO
    @Mapping(target = "homeClubId", source = "homeClub.id")
    @Mapping(target = "homeClubName", source = "homeClub.name")
    @Mapping(target = "awayClubId", source = "awayClub.id")
    @Mapping(target = "awayClubName", source = "awayClub.name")
    MatchDto toDto(Match match);

    // MapStruct will use this automatically for List<Player> → List<String>
    default String map(Player player) {
        return player.getName();
    }
}