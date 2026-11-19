package com.footballNews.football.matchService.service;

import com.footballNews.football.matchService.dtos.MatchDto;
import com.footballNews.football.matchService.dtos.MatchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface MatchService {

    MatchDto create(MatchRequest request);

    void delete(Long id);

    Page<MatchDto> getAll(Pageable pageable);

    Page<MatchDto> getByHomeClub(Long homeClubId, Pageable pageable);

    Page<MatchDto> getByAwayClub(Long awayClubId, Pageable pageable);

    Page<MatchDto> getByDate(LocalDate matchDate, Pageable pageable);

    List<MatchDto> getByClub(Long id);
}