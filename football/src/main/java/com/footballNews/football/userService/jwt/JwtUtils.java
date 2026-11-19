package com.footballNews.football.userService.jwt;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expirationAccess}")
    private Long expirationAccess;
    @Value("${jwt.expirationRefresh}")
    private Long expirationRefresh;

    public SecretKey getSignedKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String email){
       return Jwts.builder()
               .subject(email)
               .expiration(new Date( System.currentTimeMillis()+expirationAccess))
               .signWith(getSignedKey())
               .claim("type", "access")
               .issuedAt(new Date())
               .compact();
    }

    public String refreshToken(String email){
        return Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+expirationRefresh))
                .subject(email)
                .claim("type", "refresh")
                .signWith(getSignedKey())
                .compact();
    }

    public String extractEmail(String token){
        return Jwts.parser()
                .verifyWith(getSignedKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean isValidToken(String token){
        try{
            Jwts.parser()
                    .verifyWith(getSignedKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e){
            return false;
        }
    }

    public boolean isAccessToken(String token){
        String type = (String) Jwts.parser()
                .verifyWith(getSignedKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("type");
        return "access".equals(type);
    }

    public String getType(String token){
        return (String) Jwts.parser()
                .verifyWith(getSignedKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("type");
    }
}
