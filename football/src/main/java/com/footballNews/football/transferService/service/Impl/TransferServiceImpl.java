package com.footballNews.football.transferService.service.Impl;

import com.footballNews.football.transferService.domain.Transfer;
import com.footballNews.football.transferService.dtos.TransferDto;
import com.footballNews.football.transferService.dtos.TransferRequest;
import com.footballNews.football.transferService.mapper.TransferMapper;
import com.footballNews.football.transferService.repository.TransferRepository;
import com.footballNews.football.transferService.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService {
    private final TransferMapper transferMapper;
    private final TransferRepository transferRepository;
    @Override
    public TransferDto create(TransferRequest transferRequest) {
        Transfer transfer = transferMapper.toEntity(transferRequest);
        Transfer saved = transferRepository.save(transfer);
        return transferMapper.toDto(saved);
    }

    @Override
    public Page<TransferDto> getAll(Pageable pageable) {
        return transferRepository.findAll(pageable)
                .map(transferMapper::toDto);
    }

    @Override
    public Page<TransferDto> getAllByName(String name, Pageable pageable) {
        return transferRepository.findByName(name, pageable)
                .map(transferMapper::toDto);

    }

    @Override
    public Page<TransferDto> getAllByDate(LocalDate transferDate, Pageable pageable) {
        return transferRepository.findByTransferDate(transferDate, pageable)
                .map(transferMapper::toDto);
    }

    @Override
    public Page<TransferDto> getAllByClubFromId(Long fromId, Pageable pageable) {
        return transferRepository.findByFromId(fromId, pageable)
                .map(transferMapper::toDto);
    }

    @Override
    public Page<TransferDto> getAllByClubToId(Long toId, Pageable pageable) {
        return transferRepository.findByToId(toId, pageable)
                .map(transferMapper::toDto);
    }


}
