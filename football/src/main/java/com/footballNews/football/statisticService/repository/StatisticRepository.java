package com.footballNews.football.statisticService.repository;

import com.footballNews.football.statisticService.domain.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticRepository extends JpaRepository<Statistic, Long> {
    Statistic findByPlayerId(Long playerId);

    List<Statistic> findTop10ByOrderByGoalsDesc();

    List<Statistic> findByPlayer_Club_Id(Long clubId);
}
