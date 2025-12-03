package com.pokemon.pokedex.favorite.dto;

public record FavoritePokemonDto(
        Long id,
        Integer pokemonId,
        String name,
        String imageUrl,
        String type
) {}
