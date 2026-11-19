package com.footballNews.football.statisticService.service.Impl;

import com.footballNews.football.playerService.repository.PlayerRepository;
import com.footballNews.football.statisticService.domain.Statistic;
import com.footballNews.football.statisticService.dtos.StatisticDto;
import com.footballNews.football.statisticService.mapper.StatisticMapper;
import com.footballNews.football.statisticService.repository.StatisticRepository;
import com.footballNews.football.statisticService.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

    private final StatisticMapper statisticMapper;
    private final StatisticRepository statisticRepository;
    private final PlayerRepository playerRepository;

    @Override
    public StatisticDto updateGoals(Long playerId, Integer goals) {
        Statistic statistic = statisticRepository.findByPlayerId(playerId);

        if (statistic == null) {
            statistic = new Statistic();
            statistic.setPlayer(playerRepository.findById(playerId)
                    .orElseThrow(() -> new RuntimeException("Player not found")));
        }

        int currentGoals = statistic.getGoals() == null ? 0 : statistic.getGoals();
        statistic.setGoals(currentGoals + goals);

        return statisticMapper.toDto(statisticRepository.save(statistic));
    }

    @Override
    public StatisticDto updateYellowCards(Long playerId, Integer yellowCards) {
        Statistic statistic = statisticRepository.findByPlayerId(playerId);

        if (statistic == null) {
            statistic = new Statistic();
            statistic.setPlayer(playerRepository.findById(playerId)
                    .orElseThrow(() -> new RuntimeException("Player not found")));
        }

        int currentYellowCards = statistic.getYellowCards() == null ? 0 : statistic.getYellowCards();
        statistic.setYellowCards(currentYellowCards + yellowCards);

        return statisticMapper.toDto(statisticRepository.save(statistic));
    }

    @Override
    public StatisticDto updateRedCards(Long playerId, Integer redCards) {
        Statistic statistic = statisticRepository.findByPlayerId(playerId);

        if (statistic == null) {
            statistic = new Statistic();
            statistic.setPlayer(playerRepository.findById(playerId)
                    .orElseThrow(() -> new RuntimeException("Player not found")));
        }

        int currentRedCards = statistic.getRedCards() == null ? 0 : statistic.getRedCards();
        statistic.setRedCards(currentRedCards + redCards);

        return statisticMapper.toDto(statisticRepository.save(statistic));
    }

    @Override
    public List<StatisticDto> getAll() {
        return statisticRepository.findAll()
                .stream()
                .map(statisticMapper::toDto)
                .toList();
    }

    @Override
    public StatisticDto getByPlayerId(Long playerId) {
        Statistic statistic = statisticRepository.findByPlayerId(playerId);

        if (statistic == null) {
            throw new RuntimeException("Statistic not found");
        }

        return statisticMapper.toDto(statistic);
    }
}