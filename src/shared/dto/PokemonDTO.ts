import { Kind } from "../models/Pokemon";

export interface PokemonDTO {
    name: string;
    kinds: Kind[];
    spriteUrl: string;
    weight: number;
    height: number;
}