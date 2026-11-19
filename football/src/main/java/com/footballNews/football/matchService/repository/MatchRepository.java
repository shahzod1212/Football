package com.footballNews.football.matchService.repository;

import com.footballNews.football.matchService.domain.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    Page<Match> findByHomeClubId(Long homeClubId, Pageable pageable);

    Page<Match> findByAwayClubId(Long awayClubId, Pageable pageable);

    Page<Match> findByMatchDate(LocalDate matchDate, Pageable pageable);

    Page<Match> findByHomeClubIdOrAwayClubId(
            Long homeClubId,
            Long awayClubId,
            Pageable pageable
    );
    List<Match> findByHomeClubIdOrAwayClubId(Long homeClubId, Long awayClubId);
}