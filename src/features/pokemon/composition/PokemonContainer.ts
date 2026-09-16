import {PokemonApiRepository} from "../../../shared/repositories/impl/PokemonApiRepository";
import {SearchPokemonUsecase} from "../search-pokemon/usecases/SearchPokemonUsecase";

const pokemonApiRepository = new PokemonApiRepository()

export const searchPokemonUsecase = new SearchPokemonUsecase(pokemonApiRepository)