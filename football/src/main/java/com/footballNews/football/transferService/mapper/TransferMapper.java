package com.footballNews.football.transferService.mapper;

import com.footballNews.football.transferService.domain.Transfer;
import com.footballNews.football.transferService.dtos.TransferDto;
import com.footballNews.football.transferService.dtos.TransferRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransferMapper {
    @Mapping(target = "from.id", source = "fromId")
    @Mapping(target = "to.id", source = "toId")
    @Mapping(target = "transferDate",  source = "transferDate")
    Transfer toEntity(TransferRequest transferRequest);

    @Mapping(target = "fromId", source = "from.id")
    @Mapping(target = "toId", source = "to.id")
    @Mapping(target = "transferDate",  source = "transferDate")
    TransferDto toDto(Transfer transfer);
}
