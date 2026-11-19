package com.footballNews.football.statisticService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticDto {

    private Long playerId;

    private Integer goals;

    private Integer yellowCards;

    private Integer redCards;
}