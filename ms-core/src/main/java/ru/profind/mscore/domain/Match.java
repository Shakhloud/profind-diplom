package ru.profind.mscore.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "matches")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Match implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_username")
    private String firstUsername;

    @Column(name = "second_username")
    private String secondUsername;

    @Column(name = "payment_first")
    private boolean paymentFirst;

    @Column(name = "payment_second")
    private boolean paymentSecond;
}
