import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../../../theme/colors";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import {Heart} from "lucide-react-native";
import Badge from "../../../../../components/Badge";
import {Kind, Pokemon} from "../../../../../shared/models/Pokemon";
import {PhotoRecord} from "../../../../../shared/models/PhotoRecord";

interface CardProps {
    photoRecord: PhotoRecord[];
    onDelete: (photoRecord: PhotoRecord) => Promise<void>;

}

const FavCard = ({ photoRecord, onDelete }: CardProps) => {
    return (
        photoRecord.map((rec) => (
            <View key={rec.id} style={styles.container}>
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
        ))

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.xs,
        padding: spacing.md,
        borderRadius: spacing.md,
        borderWidth: 0.2,
        borderColor: colors.secondaryText,
        elevation: 2

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
    }

})


export default FavCard;