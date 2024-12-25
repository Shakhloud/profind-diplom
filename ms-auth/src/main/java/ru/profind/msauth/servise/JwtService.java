package ru.profind.msauth.servise;

import com.google.gson.Gson;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.profind.msauth.domain.User;
import ru.profind.msauth.domain.UserRole;
import ru.profind.msauth.dto.requset.TokenCheckRequest;
import ru.profind.msauth.dto.requset.TokenRefreshRequest;
import ru.profind.msauth.dto.response.AuthResponse;
import ru.profind.msauth.dto.utils.JwtBody;

import java.time.Instant;
import java.util.Date;

@Service
public class JwtService
{
    @Value("${key}") private String key;
    private final Gson gson = new Gson();

    public String createBaseToken(User user)
    {
        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("role", user.getUserRole())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plusSeconds(60*15)))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public String createRefreshToken(User user)
    {
        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("role", user.getUserRole())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plusSeconds(60*60)))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public AuthResponse refresh(TokenRefreshRequest request)
    {
        AuthResponse authResponse = null;
        try
        {
            Jwt refreshToken = Jwts.parserBuilder().setSigningKey(key).build().parse(request.getRefresh_token());
            JwtBody jwtBody = gson.fromJson(refreshToken.getBody().toString(), JwtBody.class);

            if (Instant.ofEpochSecond(jwtBody.getExp()).isBefore(Instant.now())) return null;

            User templateUser = User.builder()
                    .username(jwtBody.getUsername())
                    .userRole(UserRole.valueOf(jwtBody.getRole()))
                    .build();

            return new AuthResponse(
                    createBaseToken(templateUser),
                    createRefreshToken(templateUser)
            );
        } catch (Exception e)
        {
            return null;
        }
    }

    public boolean check(TokenCheckRequest request)
    {
        try
        {
            Jwt baseToken = Jwts.parserBuilder().setSigningKey(key).build().parse(request.getBase_token());
            JwtBody jwtBody = gson.fromJson(baseToken.getBody().toString(), JwtBody.class);
            return !Instant.ofEpochSecond(jwtBody.getExp()).isBefore(Instant.now());
        } catch (Exception e)
        {
            return false;
        }
    }
}
