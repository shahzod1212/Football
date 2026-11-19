package com.footballNews.football.transferService.service;

import com.footballNews.football.transferService.dtos.TransferDto;
import com.footballNews.football.transferService.dtos.TransferRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface TransferService {
    TransferDto create(TransferRequest transferRequest);

    Page<TransferDto> getAll(Pageable pageable);

    Page<TransferDto> getAllByName(String name, Pageable pageable);

    Page<TransferDto> getAllByDate(LocalDate transferDate, Pageable pageable);

    Page<TransferDto> getAllByClubFromId(Long fromId,Pageable pageable);

    Page<TransferDto> getAllByClubToId(Long toId, Pageable pageable);
}
