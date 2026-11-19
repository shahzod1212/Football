package com.footballNews.football.clubService.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "club")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String country;
    private String city;
    private String stadium;
    private String coach;
    private String website;
    @Column(name = "short_name")
    private String shortName;

    @Column(name = "founded_year")
    private LocalDate foundedYear;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "league_score")
    private Integer leagueScore;
    @Column(name = "goal_scored")
    private Integer goalScored = 0;

    @Column(name = "goal_against")
    private Integer goalAgainst = 0;

    @Column(name = "clean_sheets")
    private Integer cleanSheets = 0;

    @Column(name = "win_rate")
    private Integer winRate = 0;

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "club_matches_results",
            joinColumns = @JoinColumn(name = "club_id")
    )
    @Column(name = "matches_results")  // ✅ matches exact DB column name
    private List<String> matchesResults = new ArrayList<>();

    @PostLoad // ✅ fix nulls after loading from DB
    private void initDefaults() {
        if (goalScored == null) goalScored = 0;
        if (goalAgainst == null) goalAgainst = 0;
        if (cleanSheets == null) cleanSheets = 0;
        if (winRate == null) winRate = 0;
        if (matchesResults == null) matchesResults = new ArrayList<>();
    }

}
