package ru.profind.msauth.dto.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtBody
{
    private String username;
    private String role;
    private int iat;
    private int exp;
}
