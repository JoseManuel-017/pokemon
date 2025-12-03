package com.pokemon.favorite;

import com.pokemon.favorite.dto.FavoritePokemonDto;
import com.pokemon.favorite.dto.FavoritePokemonRequest;
import com.pokemon.user.User;
import com.pokemon.user.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FavoritePokemonService {

    private final FavoritePokemonRepository favoriteRepo;
    private final UserService userService;

    public FavoritePokemonService(FavoritePokemonRepository favoriteRepo,
                                  UserService userService) {
        this.favoriteRepo = favoriteRepo;
        this.userService = userService;
    }

    public List<FavoritePokemonDto> getFavoritesForUser(Long userId) {
        User user = userService.getEntity(userId);
        return favoriteRepo.findByUser(user).stream()
                .map(this::toDto)
                .toList();
    }

    public FavoritePokemonDto addFavorite(Long userId, FavoritePokemonRequest request) {
        User user = userService.getEntity(userId);

        if (favoriteRepo.existsByUserAndPokemonId(user, request.pokemonId())) {
            throw new IllegalArgumentException("Este Pokémon ya está en favoritos");
        }

        FavoritePokemon favorite = FavoritePokemon.builder()
                .pokemonId(request.pokemonId())
                .name(request.name())
                .imageUrl(request.imageUrl())
                .type(request.type())
                .user(user)
                .build();

        favoriteRepo.save(favorite);

        return toDto(favorite);
    }

    public void removeFavorite(Long userId, Integer pokemonId) {
        User user = userService.getEntity(userId);
        favoriteRepo.deleteByUserAndPokemonId(user, pokemonId);
    }

    public boolean isFavorite(Long userId, Integer pokemonId) {
        User user = userService.getEntity(userId);
        return favoriteRepo.existsByUserAndPokemonId(user, pokemonId);
    }

    private FavoritePokemonDto toDto(FavoritePokemon favorite) {
        return new FavoritePokemonDto(
                favorite.getId(),
                favorite.getPokemonId(),
                favorite.getName(),
                favorite.getImageUrl(),
                favorite.getType()
        );
    }
}
