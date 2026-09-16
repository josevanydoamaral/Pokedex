import {StyleSheet, TextInput, TouchableOpacity, View, Text, ActivityIndicator} from 'react-native'
import {spacing} from "../../../../../theme/spacing";
import {colors} from "../../../../../theme/colors";
import {typography} from "../../../../../theme/typography";
import {SearchIcon} from "lucide-react-native";

interface SearchProps {
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void,
    handleSearch: (searchTerm: string) => void,
    loading: boolean,
}

const Search = ({ searchTerm, setSearchTerm, handleSearch, loading } : SearchProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={styles.searchBar}
                placeholder="Pesquisar nome ou ID"  />

            <TouchableOpacity
                disabled={loading}
                style={styles.searchButton}
                onPress={() => handleSearch(searchTerm)}
            >
                { loading ? <ActivityIndicator /> : <SearchIcon color={colors.surface} />}

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
        fontSize: typography.fontSizes.default,
    },

    searchButton: {
        padding: spacing.sm,
        borderRadius: 14,
        backgroundColor: colors.primary,
    }

})

export default Search