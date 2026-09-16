import { View, Text, Pressable } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { StyleSheet } from 'react-native'
import {colors} from "../../../../../theme/colors";
import {spacing} from "../../../../../theme/spacing";
import {typography} from "../../../../../theme/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
    id: number
    name: string,
}

const Header = ( { name, id }: HeaderProps) => {
    const navigation = useNavigation();

    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <Pressable onPress={navigation.goBack}>
                <ArrowLeft size={20} color={colors.background} />
            </Pressable>

            <Text style={styles.pokemonName}>{ name }</Text>
            <Text style={styles.pokemonId}>#{ id.toString().padStart(3, '0') }</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        backgroundColor: colors.primary,
        paddingStart: spacing.md,
        paddingVertical: spacing.md
    },

    pokemonName: {
        color: colors.background,
        fontSize: typography.fontSizes.subtitle,
        fontWeight: typography.fontWeights.semibold,
        textTransform: 'capitalize'
    },
    pokemonId: {
        color: colors.background,
        fontSize: typography.fontSizes.subtitle,
        fontWeight: typography.fontWeights.semibold,
    }
})

export default Header