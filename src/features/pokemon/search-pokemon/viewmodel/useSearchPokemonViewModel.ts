import {useState} from "react";
import {SearchPokemonUsecase} from "../usecases/SearchPokemonUsecase";
import {searchPokemonUsecase} from "../../composition/PokemonContainer";
import {Pokemon} from "../../../../shared/models/Pokemon";

const useSearchPokemonViewModel = (usecase: SearchPokemonUsecase = searchPokemonUsecase) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        setPokemon(null)

        const result = await usecase.execute(searchTerm);

        if (!result.success) {
            setError(result.errorMessage);
            setLoading(false);
            return;
        }

        setPokemon(result.result);
        setLoading(false);
    }

    return {
        pokemon,
        error,
        loading,
        searchTerm,
        handleSearch,
        setSearchTerm
    }
}

export default useSearchPokemonViewModel;