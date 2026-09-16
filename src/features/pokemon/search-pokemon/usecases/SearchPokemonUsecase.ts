import {IPokemonRepository} from "../../../../shared/repositories/contracts/IPokemonRepository";
import {Pokemon} from "../../../../shared/models/Pokemon";

export type SearchPokemonUsecaseResult =
    { success: true, result: Pokemon } |
    { success: false, errorMessage: string }

export class SearchPokemonUsecase {
    constructor(private repository: IPokemonRepository) {}

    async execute(searchTerm: string): Promise<SearchPokemonUsecaseResult> {
        if (searchTerm.trim().length === 0) {
            return { success: false, errorMessage: "Campo vazio." };
        }

        try {
            const result = await this.repository.findPokemon(searchTerm);

            if (result === null) {
                return { success: false, errorMessage: "Pokemon não encontrado." };
            }

            console.log(result);
            return { success: true, result: result };

        } catch(error) {
            return { success: false, errorMessage: error instanceof Error ? error.message : "Falha na requisição." };
        }

    }
}