import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../../../theme/colors";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import {Heart} from "lucide-react-native";
import Badge from "../../../../../components/Badge";
import {Kind, Pokemon} from "../../../../../shared/models/Pokemon";
import {PhotoRecord} from "../../../../../shared/models/PhotoRecord";
import {useNavigation} from "@react-navigation/native";

interface CardProps {
    photoRecord: PhotoRecord[];
    onDelete: (photoRecord: PhotoRecord) => Promise<void>;

}

const FavCard = ({ photoRecord, onDelete }: CardProps) => {
    const navigation = useNavigation();
    return (
        photoRecord.map((rec) => (
            <View key={rec.id} style={styles.container}>

                <View style={styles.cardInfo}>
                    <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "center"}}>
                        {
                            rec.pokemon.spriteUrl
                                ? <Image style={styles.sprite} source={{ uri: rec.pokemon.spriteUrl }} />
                                : <View style={[styles.sprite, { backgroundColor: colors.pokemonTypes[rec.pokemon.kinds[0]]}]} />
                        }

                        <View style={{gap: spacing.sm}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.pokemonText}>{ rec.pokemon.name } </Text>
                                <Text style={styles.pokemonId}>#{ rec.pokemon.id.toString().padStart(3, '0') }</Text>
                            </View>

                            <View style={{flexDirection: 'row', gap: spacing.xs, flexWrap: 'wrap'}}>
                                <Badge kinds={rec.pokemon.kinds} />
                            </View>
                        </View>

                    </View>

                    <View>
                        <TouchableOpacity onPress={() => onDelete(rec)}>
                            <Heart color={colors.primary} fill={rec.isFavorite ? colors.primary : 'transparent'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.viewImageButton} onPress={() => navigation.navigate('Details', { pokemon: rec.pokemon, photoRecordUri: rec.capturedPhotoUri })}>
                    <Text style={styles.viewImageButtonText}>Ver Imagem</Text>
                </TouchableOpacity>
            </View>
        ))

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        gap: spacing.md,
        padding: spacing.md,
        borderRadius: spacing.md,
        borderWidth: 0.2,
        borderColor: colors.secondaryText,
        elevation: 2

    },

    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.xs,
    },

    sprite: {
        width: 70,
        height: 70,
        borderRadius: spacing.md,
    },

    searchBar: {
        fontSize: typography.fontSizes.default,
    },

    searchButton: {
        padding: spacing.sm,
        borderRadius: 14,
        backgroundColor: colors.primary,
    },

    pokemonText: {
        textTransform: "capitalize",
        fontSize: typography.fontSizes.default,
        fontWeight: typography.fontWeights.semibold
    },

    pokemonId: {
        fontWeight: typography.fontWeights.semibold
    },

    viewImageButton: {
        textAlign: 'center',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.primary,
        alignItems: "center",
        flexDirection: 'row',
        gap: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        borderRadius: spacing.sm,
    },

    viewImageButtonText: {
        margin: "auto",
        color: colors.surface,
        fontSize: typography.fontSizes.default,
    }

})


export default FavCard;