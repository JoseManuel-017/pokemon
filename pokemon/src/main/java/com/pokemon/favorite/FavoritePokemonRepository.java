package com.pokemon.favorite;

import com.pokemon.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoritePokemonRepository extends JpaRepository<FavoritePokemon, Long> {

    List<FavoritePokemon> findByUser(User user);

    void deleteByUserAndPokemonId(User user, Integer pokemonId);

    boolean existsByUserAndPokemonId(User user, Integer pokemonId);
}
