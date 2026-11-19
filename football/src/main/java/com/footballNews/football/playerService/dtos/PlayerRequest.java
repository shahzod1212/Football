package com.footballNews.football.playerService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerRequest {

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

    private Long clubId;
}
