package com.footballNews.football.transferService.domain;

import com.footballNews.football.clubService.domain.Club;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    private Club from;
    @ManyToOne
    private Club to;

    @Column(name = "transfer_date")
    private LocalDate transferDate;
    private Long value;


}
