package com.pokemon.favorite;

import com.pokemon.favorite.dto.FavoritePokemonDto;
import com.pokemon.favorite.dto.FavoritePokemonRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoritePokemonController {

    private final FavoritePokemonService favoriteService;
    private final JwtService jwtService;

    public FavoritePokemonController(FavoritePokemonService favoriteService, JwtService jwtService) {
        this.favoriteService = favoriteService;
        this.jwtService = jwtService;
    }

    private Long getUserIdFromAuthHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Token no proporcionado");
        }
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {
            throw new IllegalArgumentException("Token inválido");
        }
        return jwtService.extractUserId(token);
    }

    @GetMapping
    public ResponseEntity<List<FavoritePokemonDto>> getFavorites(@RequestHeader("Authorization") String authHeader) {
        Long userId = getUserIdFromAuthHeader(authHeader);
        return ResponseEntity.ok(favoriteService.getFavoritesForUser(userId));
    }

    @PostMapping
    public ResponseEntity<FavoritePokemonDto> addFavorite(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody FavoritePokemonRequest request
    ) {
        Long userId = getUserIdFromAuthHeader(authHeader);
        return ResponseEntity.ok(favoriteService.addFavorite(userId, request));
    }

    @DeleteMapping("/{pokemonId}")
    public ResponseEntity<Void> removeFavorite(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer pokemonId
    ) {
        Long userId = getUserIdFromAuthHeader(authHeader);
        favoriteService.removeFavorite(userId, pokemonId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{pokemonId}/exists")
    public ResponseEntity<Boolean> isFavorite(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Integer pokemonId
    ) {
        Long userId = getUserIdFromAuthHeader(authHeader);
        return ResponseEntity.ok(favoriteService.isFavorite(userId, pokemonId));
    }
}
