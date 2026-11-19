package com.footballNews.football.playerService.domain;

import com.footballNews.football.clubService.domain.Club;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String firstname;

    private String lastname;

    private Integer age;

    private String nationality;

    private String height;

    private String weight;

    private String position;

    private Integer number;

    private String photo;

    @ManyToOne
    private Club club;

}