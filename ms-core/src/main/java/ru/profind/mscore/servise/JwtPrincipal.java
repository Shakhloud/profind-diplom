package ru.profind.mscore.servise;

import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.profind.mscore.domain.UserRole;

@AllArgsConstructor
@Getter
public class JwtPrincipal
{
    private String username;
    private UserRole userRole;
}
