package com.pokemon.pokedex.favorite.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FavoritePokemonRequest(
        @NotNull Integer pokemonId,
        @NotBlank String name,
        String imageUrl,
        String type
) {}
