import {StyleSheet, Text, View} from "react-native";
import {colors} from "../theme/colors";
import {typography} from "../theme/typography";
import {Kind} from "../shared/models/Pokemon";

interface BadgeProps {
    kinds: Array<Kind>;
}

const Badge = ({ kinds=['electric'] }: BadgeProps) => {

    return (
        kinds.map((kind) => (
            <View key={kind} style={[styles.badge, { backgroundColor: colors.pokemonTypes[kind ?? "normal"] }]}>
                <Text style={styles.badgeText}>{kind}</Text>
            </View>
        ))

    )
}

const styles = StyleSheet.create({
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
})
export default Badge