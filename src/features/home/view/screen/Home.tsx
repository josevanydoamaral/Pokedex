import useSearchPokemonViewModel from "../../../pokemon/search-pokemon/viewmodel/useSearchPokemonViewModel";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {spacing} from "../../../../theme/spacing";
import Header from "../../../pokemon/search-pokemon/view/components/Header";
import {colors} from "../../../../theme/colors";
import {typography} from "../../../../theme/typography";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Search from "../../../pokemon/search-pokemon/view/components/Search";
import FavCard from "../../../pokemon/search-pokemon/view/components/FavCard";
import SearchResultCard from "../../../pokemon/search-pokemon/view/components/SearchResultCard";
import useFavoritesViewModel from "../../../photo-record/manage-favorites/viewmodel/UseFavoritesViewModel";
import UseSyncRecordsViewModel from "../../../sync/sync-records/viewModel/UseSyncRecordsViewModel";

const Home = () => {
    const insets = useSafeAreaInsets();

    const {
        loading,
        pokemon,
        error,
        searchTerm,
        hasOfflineSearchFailed,
        isConnected,
        setSearchTerm,
        handleSearch
    } = useSearchPokemonViewModel()

    const {
        handleDelete,
        photoRecord,
        errorMessage
    } = useFavoritesViewModel()

    const {
        syncing,
        handleSync
    } = UseSyncRecordsViewModel()

    return (
        <View style={{ flex: 1, gap: spacing.lg }}>
            <Header isSyncing={syncing} onSync={handleSync}/>

            <ScrollView contentContainerStyle={styles.container}>

                <Search
                    isConnected={isConnected}
                    hasOfflineSearchFailed={hasOfflineSearchFailed}
                    loading={loading}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                />

                {pokemon !== null &&
                    <SearchResultCard
                        pokemon={pokemon}
                    />
                }


                <Text style={styles.favoriteText}>Favoritos</Text>


                { photoRecord.length > 0
                    ? <FavCard photoRecord={photoRecord} onDelete={handleDelete} />
                    : errorMessage
                        ? <Text>{errorMessage}</Text>
                    : <Text>Ainda não existem registos favoritos</Text>
                }

            </ScrollView>

            { !!error && <Text style={styles.errorText}>{error}</Text> }

            <Text style={[styles.textPage, { paddingBottom: insets.bottom }]}>Home</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.surface,
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
    },

    favoriteText: {
        fontSize: typography.fontSizes.default,
        fontWeight: typography.fontWeights.semibold,
        color: colors.secondaryText,
        marginTop: spacing.xxl,
        marginBottom: spacing.xs,
    },

    textPage: {
        marginVertical: spacing.sm,
        textAlign: "center",
        color: colors.secondaryText,
        fontWeight: typography.fontWeights.semibold,
    },

    errorText: {
        marginVertical: spacing.sm,
        textAlign: "center",
        color: colors.primary,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.fontSizes.default,
    }
})


export default Home;