package com.footballNews.football.playerService.repository;

import com.footballNews.football.playerService.domain.Player;
import com.footballNews.football.playerService.dtos.PlayerDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    // 🔹 All players by club/team
    Page<Player> findByClubId(Long clubId, Pageable pageable);

    // 🔹 Search by name only
    Page<Player> findByNameContainingIgnoreCase(String name, Pageable pageable);

    // 🔹 Search by club + name
    Page<Player> findByClubIdAndNameContainingIgnoreCase(
            Long clubId,
            String name,
            Pageable pageable
    );
    Player findByName(String name);

    // 🔹 Search by position
    Page<Player> findByPositionIgnoreCase(String position, Pageable pageable);

    // 🔹 Search by nationality
    Page<Player> findByNationalityIgnoreCase(String nationality, Pageable pageable);

    // 🔹 Club + position
    Page<Player> findByClubIdAndPositionIgnoreCase(
            Long clubId,
            String position,
            Pageable pageable
    );

    // 🔹 Club + nationality
    Page<Player> findByClubIdAndNationalityIgnoreCase(
            Long clubId,
            String nationality,
            Pageable pageable
    );

    // 🔹 Club + position + nationality (your request)
    Page<Player> findByClubIdAndPositionIgnoreCaseAndNationalityIgnoreCase(
            Long clubId,
            String position,
            String nationality,
            Pageable pageable
    );

    // 🔹 Full flexible search (club + name + position + nationality)
    Page<Player> findByClubIdAndNameContainingIgnoreCaseAndPositionIgnoreCaseAndNationalityIgnoreCase(
            Long clubId,
            String name,
            String position,
            String nationality,
            Pageable pageable
    );
}