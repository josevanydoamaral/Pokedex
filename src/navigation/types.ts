import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../features/home/view/screen/Home";
import PokemonDetail from "../features/photo-record/save-photo-record/view/screen/PokemonDetail";
import type {Pokemon} from "../shared/models/Pokemon";
import {createStaticNavigation} from "@react-navigation/native";
import {colors} from "../theme/colors";

export type RecordDetailsScreenProps = {
    pokemon?: Pokemon,
    photoRecordId?: string
}

const RootStack = createNativeStackNavigator({
    screenOptions: { headerShown: false, contentStyle: { backgroundColor: colors.surface }, },
    screens: {
        Home: {
            screen: Home,

        },

        Details: {
            screen: PokemonDetail,

        }
    }
})

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/core' {
    interface RootNavigator extends RootStackType {}
}