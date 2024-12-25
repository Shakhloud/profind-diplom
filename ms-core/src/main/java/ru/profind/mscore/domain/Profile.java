package ru.profind.mscore.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "profiles")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Profile implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username", unique = true)
    private String username;

    private String name;

    @Column(columnDefinition="text")
    private String about;

    @Column(name = "no_valid_msg", columnDefinition="text")
    private String noValidMsg;

    @Enumerated(EnumType.STRING)
    private ProfileStatus profileStatus;

    @Enumerated(EnumType.STRING)
    private ProfileGoal profileGoal;

    @Enumerated(EnumType.STRING)
    private ProfileProgramLang profileProgramLang;

    private String vk;
    private String telegram;
    private String phone;
    private String email;
}
