package ru.profind.msauth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Configuration
public class Config implements WebMvcConfigurer
{

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new PasswordEncoder()
        {
            @Override
            public String encode(CharSequence rawPassword)
            {
                MessageDigest md = null;
                try {
                    md = MessageDigest.getInstance("SHA-1");
                }
                catch(NoSuchAlgorithmException e)
                {
                    e.printStackTrace();
                }
                assert md != null;
                return new String(md.digest(rawPassword.toString().getBytes()));
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword)
            {
                MessageDigest md = null;
                try {
                    md = MessageDigest.getInstance("SHA-1");
                }
                catch(NoSuchAlgorithmException e)
                {
                    e.printStackTrace();
                }
                assert md != null;
                return new String(md.digest(rawPassword.toString().getBytes())).equals(encodedPassword);
            }
        };
    }
}
