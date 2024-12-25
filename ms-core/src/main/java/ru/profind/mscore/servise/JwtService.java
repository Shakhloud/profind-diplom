package ru.profind.mscore.servise;

import com.google.gson.Gson;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.profind.mscore.domain.UserRole;
import ru.profind.mscore.dto.utils.JwtBody;

import java.time.Instant;

@Service
public class JwtService
{
    @Value("${key}") private String key;
    private final Gson gson = new Gson();

    public JwtPrincipal validate(String baseToken) {
        try
        {
            Jwt baseTokenJwt = Jwts.parserBuilder().setSigningKey(key).build().parse(baseToken);
            JwtBody jwtBody = gson.fromJson(baseTokenJwt.getBody().toString(), JwtBody.class);
            if (Instant.ofEpochSecond(jwtBody.getExp()).isAfter(Instant.now())) {
                return new JwtPrincipal(jwtBody.getUsername(), UserRole.valueOf(jwtBody.getRole()));
            } else
                return null;
        } catch (Exception e)
        {
            return null;
        }
    }
}
