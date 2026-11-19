package com.footballNews.football.statisticService.mapper;

import com.footballNews.football.statisticService.domain.Statistic;
import com.footballNews.football.statisticService.dtos.StatisticDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StatisticMapper {

    @Mapping(target = "playerId", source = "player.id")
    StatisticDto toDto(Statistic statistic);
}