import {View, StyleSheet, Text, Image} from 'react-native'
import {colors} from "../../../../../theme/colors";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import {Pokemon} from "../../../../../shared/models/Pokemon";
import Badge from "../../../../../components/Badge";
import {cmToM} from "../../../../../utils/utils";

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

                <Badge kinds={pokemon.kinds} />


            </View>

            <View style={styles.specs}>
                <View>
                    <Text style={styles.specText}>Altura</Text>
                    <Text style={styles.specValue}>{pokemon.height}m</Text>
                </View>

                <View>
                    <Text style={styles.specText}>Peso</Text>
                    <Text style={styles.specValue}>{pokemon.weight}Kg</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },

    specText: {
        color: colors.secondaryText,
        fontSize: typography.fontSizes.default
    },

    specValue: {
        color: colors.primaryText,
        fontWeight: typography.fontWeights.bold,
        fontSize: typography.fontSizes.default

    }
})

 export default Profile