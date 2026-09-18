import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {colors} from "../../../../../theme/colors";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import {ArrowRight, Heart} from "lucide-react-native";
import Badge from "../../../../../components/Badge";
import {Kind, Pokemon} from "../../../../../shared/models/Pokemon";
import {useNavigation} from "@react-navigation/native";
import {PhotoRecord} from "../../../../../shared/models/PhotoRecord";

interface CardProps {
    pokemon: Pokemon;
}

const FavCard = ({ pokemon }: CardProps) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "center", flex: 1}}>
                    {
                        pokemon.spriteUrl
                            ? <Image style={styles.sprite} source={{ uri: pokemon.spriteUrl }} />
                            : <View style={[styles.sprite, { backgroundColor: colors.pokemonTypes[pokemon.kinds[0]]}]} />
                    }

                    <View style={{gap: spacing.sm}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.pokemonText}>{ pokemon.name } </Text>
                            <Text style={styles.pokemonId}>#{ pokemon.id.toString().padStart(3, '0') }</Text>
                        </View>
                        <View style={{ gap: spacing.xs, flexDirection: "row"}}>
                            <Badge kinds={pokemon.kinds} />
                        </View>

                    </View>

                </View>
            </View>

            <View style={{width: '100%'}}>
                <Pressable style={styles.goDetailsButton} onPress={() => {
                    navigation.navigate('Details', { pokemon: pokemon })
                }} >
                    <Text style={{color: colors.surface, flex: 1}}>Ver Detalhes</Text>
                    <ArrowRight color={colors.surface} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
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
    },

    goDetailsButton: {
        width: '100%',
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        gap: spacing.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        borderRadius: spacing.sm,
    }

})


export default FavCard;