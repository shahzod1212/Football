package com.footballNews.football.statisticService.service;

import com.footballNews.football.statisticService.dtos.StatisticDto;

import java.util.List;

public interface StatisticService {

    // Create statistic for a player

    // Update goals only
    StatisticDto updateGoals(Long playerId, Integer goals);

    // Update yellow cards only
    StatisticDto updateYellowCards(Long playerId, Integer yellowCards);

    // Update red cards only
    StatisticDto updateRedCards(Long playerId, Integer redCards);

    // Get all statistics
    List<StatisticDto> getAll();

    // Get statistics by player ID
    StatisticDto getByPlayerId(Long playerId);
}