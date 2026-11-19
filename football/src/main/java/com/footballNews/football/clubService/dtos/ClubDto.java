package com.footballNews.football.clubService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClubDto {
    private Long id;

    private String name;
    private String shortName;
    private String country;
    private String city;
    private String stadium;
    private LocalDate foundedYear;
    private String logoUrl;
    private String coach;
    private String website;
    private Integer leagueScore;
    private List<String> matchesResults;
    private Integer winRate;
    private Integer goalScored;
    private Integer goalAgainst;
    private Integer cleanSheets;
}
