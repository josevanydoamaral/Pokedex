import {View, StyleSheet, Text, Image} from 'react-native'
import {colors} from "../../../../../theme/colors";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import {Pokemon} from "../../../../../shared/models/Pokemon";
import Badge from "../../../../../components/Badge";
import {dmToM} from "../../../../../utils/utils";

type PokemonProps = {
    pokemon: Pokemon
}

const Profile = ( { pokemon }: PokemonProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                {
                    pokemon.spriteUrl
                        ? <Image style={styles.sprite} source={{ uri: pokemon.spriteUrl }} />
                        : <View style={[styles.sprite, { backgroundColor: colors.pokemonTypes[pokemon.kinds[0]]}]} />
                }

                <View style={{flexDirection: "row", gap: spacing.xs}}>
                    <Badge kinds={pokemon.kinds} />

                </View>

            </View>

            <View style={styles.specs}>
                <View style={{flex:1, flexShrink:1, alignItems: "center"}}>
                    <Text style={styles.specText}>Altura</Text>
                    <Text style={styles.specValue}>{pokemon.height}m</Text>
                </View>

                <View style={{flex: 1, flexShrink: 1, alignItems: "center"}}>
                    <Text style={styles.specText}>Peso</Text>
                    <Text style={styles.specValue}>{pokemon.weight}Kg</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacing.md,
        alignItems: "center",

    },

    profile: {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.md,
    },

    sprite: {
        width: 100,
        height: 100,
        borderRadius: 50,

    },

    badge: {
        backgroundColor: colors.pokemonTypes.electric,
        width: 80,
        height: 20,
        borderRadius: 10,

    },

    badgeText: {
        textAlign: 'center',
        color: colors.primaryText,
        fontWeight: typography.fontWeights.semibold
    },

    specs: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    specText: {
        minWidth: 60,
        color: colors.secondaryText,
        fontSize: typography.fontSizes.default
    },

    specValue: {
        minWidth: 60,
        color: colors.primaryText,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.fontSizes.default

    }
})

 export default Profile