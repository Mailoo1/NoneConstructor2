import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Éxito', 'Usuario creado');
        navigation.replace('Login');
        } catch (error) {
        Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Registro</Text>

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

        <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: '#10B981', padding: 15 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Registrarse</Text>
        </TouchableOpacity>
        </View>
    );
}