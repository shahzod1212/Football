package com.footballNews.football.transferService.repository;

import com.footballNews.football.transferService.domain.Transfer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    Page<Transfer> findByName(String name, Pageable pageable);

    Page<Transfer> findByTransferDate(LocalDate transferDate, Pageable pageable);

    Page<Transfer> findByFromId(Long fromId, Pageable pageable);

    Page<Transfer> findByToId(Long toId, Pageable pageable);
}
