import {IPokemonRepository} from "../contracts/IPokemonRepository";
import {Kind, Pokemon} from "../../models/Pokemon";
import {IPokemonApiResponse} from "./dtos/IPokemonApiResponse";
import {dmToM, hgToKg} from "../../../utils/utils";

export class PokemonApiRepository implements IPokemonRepository {
    async findPokemon(searchTerm: string): Promise<Pokemon | null> {
        const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.trim().toLowerCase()}/`

        const    response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Erro específico do servidor (${response.statusText ?? "Desconhecido"}).`)

        }

        const responseJson: IPokemonApiResponse = await response.json();

        const kinds = responseJson.types.map(t => t.type.name) as Kind[];

        return {
            id: responseJson.id,
            name: responseJson.name,
            height: dmToM(responseJson.height),
            weight: hgToKg(responseJson.weight),
            kinds: kinds,
            spriteUrl: responseJson.sprites.front_default ?? "",
        }
    }

}