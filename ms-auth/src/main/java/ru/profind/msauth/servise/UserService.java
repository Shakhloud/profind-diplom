package ru.profind.msauth.servise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.profind.msauth.domain.User;
import ru.profind.msauth.domain.UserRole;
import ru.profind.msauth.dto.requset.AuthRequest;
import ru.profind.msauth.dto.response.AuthResponse;
import ru.profind.msauth.repository.UserRepository;

import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@Service
@Transactional
public class UserService
{
    @Autowired private JwtService jwtService;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public boolean register(AuthRequest request) {
        AtomicBoolean result = new AtomicBoolean();
        userRepository.findUserByUsername(request.getUsername()).ifPresentOrElse(
                user -> result.set(false),
                () -> {
                    userRepository.saveAndFlush(User.builder()
                            .userRole(UserRole.USER)
                            .username(request.getUsername())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .build());
                    result.set(true);
                }
        );
        return result.get();
    }

    public AuthResponse login(AuthRequest request) {
        AtomicReference<AuthResponse> authResponse = new AtomicReference<>();
        userRepository.findUserByUsername(request.getUsername()).ifPresent(
                user -> {
                    if (passwordEncoder.matches(request.getPassword(), user.getPassword()))
                        authResponse.set(
                                new AuthResponse(
                                        jwtService.createBaseToken(user),
                                        jwtService.createRefreshToken(user)
                                ));
                });
        return authResponse.get();
    }
}
