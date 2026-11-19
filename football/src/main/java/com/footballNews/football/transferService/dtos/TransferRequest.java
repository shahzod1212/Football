package com.footballNews.football.transferService.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferRequest {
    private String name;
    private Long fromId;
    private Long toId;
    private LocalDate transferDate;
    private Long value;
}
