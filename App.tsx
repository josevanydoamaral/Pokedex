import {SafeAreaProvider} from "react-native-safe-area-context";
import {Navigation} from "./src/navigation/types";

export default function App() {
  return (
      <SafeAreaProvider>
          <Navigation  />
      </SafeAreaProvider>

  );
}


