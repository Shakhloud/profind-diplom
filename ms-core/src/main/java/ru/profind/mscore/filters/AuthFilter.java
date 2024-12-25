package ru.profind.mscore.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.profind.mscore.servise.JwtPrincipal;
import ru.profind.mscore.servise.JwtService;

import java.io.IOException;

@Component
public class AuthFilter implements Filter
{
    @Autowired private JwtService jwtService;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException
    {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        if (request.getMethod().equals("OPTIONS"))
        {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String authToken = request.getHeader("auth_token");

        if (authToken == null)
        {
            invalidateResponse(response);
            return;
        }

        if (!authToken.contains("bearer_"))
        {
            invalidateResponse(response);
            return;
        }

        JwtPrincipal jwtPrincipal = jwtService.validate(authToken.substring(authToken.indexOf("bearer_") + "bearer_".length()));
        if (jwtPrincipal == null)
        {
            invalidateResponse(response);
            return;
        }

        request.setAttribute("username", jwtPrincipal.getUsername());
        request.setAttribute("role", jwtPrincipal.getUserRole());
        filterChain.doFilter(servletRequest, servletResponse);
    }

    public void invalidateResponse(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
        response.setStatus(403);
    }
}