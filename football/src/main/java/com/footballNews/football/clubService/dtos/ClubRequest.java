package com.footballNews.football.clubService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClubRequest {
    private String name;
    private String shortName;
    private String country;
    private String city;
    private String stadium;
    private LocalDate foundedYear;
    private String logoUrl;
    private String coach;
    private String website;
}
