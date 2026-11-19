package com.footballNews.football.statisticService.controller;

import com.footballNews.football.statisticService.dtos.StatisticDto;
import com.footballNews.football.statisticService.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;

    @GetMapping
    public ResponseEntity<List<StatisticDto>> getAll() {
        return ResponseEntity.ok(statisticService.getAll());
    }

    @GetMapping("/{playerId}")
    public ResponseEntity<StatisticDto> getByPlayerId(@PathVariable Long playerId) {
        return ResponseEntity.ok(statisticService.getByPlayerId(playerId));
    }
}