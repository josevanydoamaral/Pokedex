import {StyleSheet, TextInput, TouchableOpacity, View, Text, ActivityIndicator} from 'react-native'
import {spacing} from "../../../../../theme/spacing";
import {colors} from "../../../../../theme/colors";
import {typography} from "../../../../../theme/typography";
import {SearchIcon} from "lucide-react-native";

interface SearchProps {
    hasOfflineSearchFailed: boolean;
    isConnected: boolean;
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void,
    handleSearch: (searchTerm: string) => void,
    loading: boolean,
}

const Search = ({ searchTerm, setSearchTerm, handleSearch, loading, hasOfflineSearchFailed, isConnected } : SearchProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={styles.searchBar}
                placeholder="Pesquisar nome ou ID"
                placeholderTextColor={colors.secondaryText}
            />

            <TouchableOpacity
                disabled={loading || (hasOfflineSearchFailed && !isConnected)}
                style={styles.searchButton}
                onPress={() => handleSearch(searchTerm)}
            >
                { loading
                    ? <ActivityIndicator />
                    : hasOfflineSearchFailed && isConnected
                    ? <Text style={{color: colors.surface}}>Atualizar pesquisa</Text>
                    : <SearchIcon color={colors.surface} />
                }

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        paddingVertical: spacing.xs,
        paddingLeft: spacing.md,
        paddingRight: spacing.sm,
        borderRadius: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,

    },

    searchBar: {
        flexGrow: 2,
        fontSize: typography.fontSizes.default,
    },

    searchButton: {

        padding: spacing.sm,
        borderRadius: 14,
        backgroundColor: colors.primary,
    }

})

export default Search