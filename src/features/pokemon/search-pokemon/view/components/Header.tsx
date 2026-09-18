import {View, Text, Pressable, TouchableOpacity, ActivityIndicator} from 'react-native'
import {ArrowLeft, CloudSync} from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import {colors} from "../../../../../theme/colors";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native'
import {useNetInfo} from '@react-native-community/netinfo';

interface HeaderProps {
    isSyncing: boolean;
    onSync: () => void
}

const Header = ({ isSyncing, onSync } : HeaderProps) => {

    const netInfo = useNetInfo()
    const isConnected = Boolean(netInfo.isConnected && netInfo.isInternetReachable)

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: insets.top * 1.5}]}>
            <Text style={styles.appTitle}>Pokedex</Text>

            <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
                <View style={[styles.badge, { backgroundColor: isConnected ? colors.success : colors.error }]}>
                    <Text style={styles.badgeText}>{ isConnected ? 'Online' : 'Offline' }</Text>
                </View>

                <TouchableOpacity
                    disabled={isSyncing || !isConnected}
                    style={[
                        styles.syncButton,
                        !isConnected && {
                            backgroundColor: colors.error,
                            opacity: isSyncing ? 0.5 : 1,
                        },
                    ]}
                    onPress={() => onSync()}
                >
                    { isSyncing
                        ? <ActivityIndicator />
                        : <CloudSync color={colors.surface} />
                    }
                </TouchableOpacity>
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

    syncButton: {
        padding: spacing.sm,
        borderRadius: '50%',
        backgroundColor: colors.warning
    }
})

export default Header