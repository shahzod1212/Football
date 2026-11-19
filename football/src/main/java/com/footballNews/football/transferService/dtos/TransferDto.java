package com.footballNews.football.transferService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferDto {
    private Long id;
    private String name;
    private Long fromId;
    private Long toId;
    private Long value;
    private LocalDate transferDate;
}
