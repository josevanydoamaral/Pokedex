import { View, Text, Pressable } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import {colors} from "../../../../../theme/colors";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native'
import {useNetInfo} from '@react-native-community/netinfo';


const Header = () => {

    const netInfo = useNetInfo()
    const isConnected = Boolean(netInfo.isConnected && netInfo.isInternetReachable)

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Text style={styles.appTitle}>Pokedex</Text>

            <View style={[styles.badge, { backgroundColor: isConnected ? colors.success : colors.error }]}>
                <Text style={styles.badgeText}>{ isConnected ? 'Online' : 'Offline' }</Text>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.md,
        backgroundColor: colors.primary,
        paddingStart: spacing.md,
        paddingEnd: spacing.md,
        paddingVertical: spacing.md
    },

    appTitle: {
        color: colors.background,
        fontSize: typography.fontSizes.title,
        fontWeight: typography.fontWeights.semibold
    },

    badge: {
        justifyContent: 'center',
        backgroundColor: colors.pokemonTypes.electric,
        width: 90,
        height: 35,
        borderRadius: 20,

    },

    badgeText: {
        fontSize: typography.fontSizes.default,
        textAlign: 'center',
        color: colors.primaryText,
        fontWeight: typography.fontWeights.semibold
    },
})

export default Header