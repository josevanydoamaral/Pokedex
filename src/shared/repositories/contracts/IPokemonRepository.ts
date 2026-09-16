import {Pokemon} from "../../models/Pokemon";

export interface IPokemonRepository {
    findPokemon: (searchTerm: string) => Promise<Pokemon | null>;
}