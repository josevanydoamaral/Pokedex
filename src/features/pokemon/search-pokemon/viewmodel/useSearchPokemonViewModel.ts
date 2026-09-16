import {useState} from "react";
import {SearchPokemonUsecase} from "../usecases/SearchPokemonUsecase";
import {searchPokemonUsecase} from "../../composition/PokemonContainer";
import {Pokemon} from "../../../../shared/models/Pokemon";
import {useNetInfo} from "@react-native-community/netinfo";
import {Alert} from "react-native";

const useSearchPokemonViewModel = (usecase: SearchPokemonUsecase = searchPokemonUsecase) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasOfflineSearchFailed, setHasOfflineSearchFailed] = useState(false);

    const netInfo = useNetInfo();
    const isConnected = Boolean(netInfo.isConnected && netInfo.isInternetReachable);

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        setPokemon(null)

        if (!isConnected) {
            Alert.alert("Sem acesso a Internet", "É necessária conexão para pesquisar.", [{text: 'Ok'}]);
            setError("É necessária conexão para pesquisar.");
            setHasOfflineSearchFailed(true);
            setLoading(false);
            return;
        }

        const result = await usecase.execute(searchTerm);
        setHasOfflineSearchFailed(false);

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
        hasOfflineSearchFailed,
        isConnected,
        handleSearch,
        setSearchTerm
    }
}

export default useSearchPokemonViewModel;