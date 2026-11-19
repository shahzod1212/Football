package com.footballNews.football.clubService.config;

import com.footballNews.football.clubService.dtos.TeamResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Slf4j
@Component
@RequiredArgsConstructor
public class FootballApiClient {

    private final RestClient restClient;

    @Value("${api.football.key}")
    private String apiKey;

    public TeamResponse getTeams(int leagueId, int season) {

        String rawResponse = restClient.get()
                .uri("https://v3.football.api-sports.io/teams?league="
                        + leagueId + "&season=" + season)
                .header("x-apisports-key", apiKey)
                .header("x-apisports-host", "v3.football.api-sports.io")
                .retrieve()
                .body(String.class);

        log.info("RAW API RESPONSE for league {}:\n{}", leagueId, rawResponse);

        if (rawResponse == null || rawResponse.isBlank()) {
            log.error("Empty API response for league {}", leagueId);
            return null;
        }

        try {
            return new com.fasterxml.jackson.databind.ObjectMapper()
                    .readValue(rawResponse, TeamResponse.class);

        } catch (Exception e) {
            log.error("Failed to parse API response for league {}", leagueId, e);
            return null;
        }
    }
}