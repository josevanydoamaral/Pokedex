import UseSavePhotoRecordViewModel from "../../viewmodel/useSavePhotoRecordViewModel";
import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { useSafeAreaInsets} from "react-native-safe-area-context";
import {colors} from "../../../../../theme/colors";
import Header from "../components/Header";
import Profile from "../components/Profile";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import PhotoSection from "../components/PhotoSection";
import {StaticScreenProps} from "@react-navigation/native";
import {Pokemon} from "../../../../../shared/models/Pokemon";
import {savePhotoRecordUsecase} from "../../../composition/PhotoRecordContainer";
import {PhotoRecord} from "../../../../../shared/models/PhotoRecord";

type Props = StaticScreenProps<{
    pokemon: Pokemon,
    photoRecordUri?: string,
}>

const PokemonDetail = ({ route }: Props) => {

    const isReadOnly = Boolean(route.params.photoRecordUri);


    const { pokemon } = route.params;

    const {
        isLoading,
        errorMessage,
        successMessage,
        capturedPhotoUri,
        isFavorite,
        handleToggleFavorite,
        handleSavePhotoRecord,
        takePhoto
    } = UseSavePhotoRecordViewModel();

    const insets = useSafeAreaInsets();


    return (
        <View style={{ flex: 1, gap: spacing.lg }}>
            <Header name={pokemon.name} id={pokemon.id}/>

            <ScrollView contentContainerStyle={styles.container}>
                <Profile pokemon={pokemon} />

                <PhotoSection takePhoto={takePhoto} capturedPhotoUri={route.params.photoRecordUri ?? capturedPhotoUri} />

            </ScrollView>

            {errorMessage && (
                <Text>{errorMessage}</Text>
            )}

            {successMessage && (
                <Text>{successMessage}</Text>
            )}

            { !isReadOnly && (
                <View style={styles.actionSection}>
                    <TouchableOpacity
                        disabled={isLoading}
                        style={styles.favoriteButton}
                        onPress={() => handleSavePhotoRecord(pokemon)}>
                        <Text style={styles.favoriteButtonText}>Favoritar</Text>
                    </TouchableOpacity>

                </View>
            )}


            <Text style={[styles.textPage, { paddingBottom: insets.bottom}]}>Detalhes</Text>
        </View>
    )
}

const styles = StyleSheet.create({


    container: {
        flexGrow: 1,
        paddingHorizontal: spacing.xs,
        backgroundColor: colors.surface,
        gap: spacing.lg,
    },

    actionSection: {
        justifyContent: "center",
        flexDirection: 'row',
        gap: spacing.md,
    },

    favoriteButton: {
        justifyContent: 'center',
        width: '90%',
        height: 40,
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: spacing.md,
    },

    favoriteButtonText: {
        textAlign: 'center',
        color: colors.background,
        fontSize: typography.fontSizes.default,
        fontWeight: typography.fontWeights.semibold
    },

    deleteButton: {
        borderRadius: spacing.md,

        justifyContent: 'center',
        width: '40%',
        height: 40,
        backgroundColor: colors.surface,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1.4,
        borderColor: colors.primary,

    },


    deleteButtonText: {
        textAlign: 'center',
        color: colors.primary,
        fontSize: typography.fontSizes.default,
        fontWeight: typography.fontWeights.regular
    },

    textPage: {
        marginVertical: spacing.sm,
        textAlign: "center",
        color: colors.secondaryText,
        fontWeight: typography.fontWeights.semibold,
    }
})

export default PokemonDetail;