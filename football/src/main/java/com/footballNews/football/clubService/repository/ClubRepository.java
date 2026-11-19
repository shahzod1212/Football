package com.footballNews.football.clubService.repository;

import com.footballNews.football.clubService.domain.Club;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    Page<Club> findByCountry(String country, Pageable pageable);

    Page<Club> findByCity(String city, Pageable pageable);

    Page<Club> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Club> findByCountryOrderByLeagueScoreDesc(String country, Pageable pageable);
}
