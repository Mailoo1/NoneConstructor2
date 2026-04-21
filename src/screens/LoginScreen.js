// src/screens/LoginScreen.js
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginScreen({ navigation, setSesionActiva }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
        await signInWithEmailAndPassword(auth, email, password);
        setSesionActiva(true);
        navigation.replace("App");
        } catch (error) {
        Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        />

        <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
        />

        <TouchableOpacity
            onPress={handleLogin}
            style={{ backgroundColor: "#F97316", padding: 15 }}
        >
            <Text style={{ color: "white", textAlign: "center" }}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ marginTop: 15, textAlign: "center" }}>
            ¿No tienes cuenta? Regístrate
            </Text>
        </TouchableOpacity>
        </View>
    );
}
