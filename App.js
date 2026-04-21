import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebase";
import { View, ActivityIndicator } from "react-native";

import SplashScreen from "./src/screens/SplashScreen";
import AppNavigator from "./src/navigation/AppNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [sesionActiva, setSesionActiva] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSesionActiva(!!user);

      setTimeout(() => {
        setCargando(false);
      }, 3000);
    });

    return unsubscribe;
  }, []);

  if (cargando) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!sesionActiva ? (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} setSesionActiva={setSesionActiva} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="App" component={AppNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}