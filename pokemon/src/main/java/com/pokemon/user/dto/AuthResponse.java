package com.pokemon.user.dto;

public record AuthResponse(
        String token,
        UserDto user
) {}
