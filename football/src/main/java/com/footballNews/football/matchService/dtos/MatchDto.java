package com.footballNews.football.matchService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchDto {

    private Long id;

    private Long homeClubId;
    private String homeClubName;

    private Long awayClubId;
    private String awayClubName;

    private Integer homeScore;
    private Integer awayScore;

    private LocalDate matchDate;

    private List<String> goalScorers;

    private List<String> yellowCardPlayers;

    private List<String> redCardPlayers;
}