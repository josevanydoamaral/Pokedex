import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PokemonDetail from "./src/features/photo-record/save-photo-record/view/screen/PokemonDetail";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Home from "./src/features/home/view/screen/Home"
import {Navigation} from "./src/navigation/types";

export default function App() {
  return (
      <SafeAreaProvider>
          <Navigation  />
      </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',

  },
});
