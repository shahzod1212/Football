package com.footballNews.football.statisticService.domain;

import com.footballNews.football.playerService.domain.Player;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "statistic")
public class Statistic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Each statistic record belongs to one player
    @ManyToOne
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    // Goals scored
    @Builder.Default
    private Integer goals = 0;

    // Yellow cards
    @Builder.Default
    private Integer yellowCards = 0;

    // Red cards
    @Builder.Default
    private Integer redCards = 0;
}