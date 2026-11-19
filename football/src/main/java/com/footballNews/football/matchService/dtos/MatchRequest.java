package com.footballNews.football.matchService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchRequest {

    private Long homeClubId;

    private Long awayClubId;

    private Integer homeScore;

    private Integer awayScore;

    private LocalDate matchDate;

    private List<Long> goalScorerIds;

    private List<Long> yellowCardPlayerIds;

    private List<Long> redCardPlayerIds;
}