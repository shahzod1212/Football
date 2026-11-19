package com.footballNews.football.clubService.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)  // ⭐ IMPORTANT FIX
public class TeamResponse {

    private List<ResponseItem> response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ResponseItem {
        private Team team;
        private Venue venue;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Team {
        private Integer id;
        private String name;
        private String country;
        private Integer founded;
        private String logo;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Venue {
        private String name;
        private String city;
    }
}