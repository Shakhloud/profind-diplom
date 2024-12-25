package ru.profind.mscore.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "prematches")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Prematch implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "target_username")
    private String targetUsername;

    @Column(name = "swaip_username")
    private String swaipUsername;

    @Column(name = "was_like")
    private boolean wasLike;

    @Column(name = "is_complete")
    private boolean isComplete;
}
