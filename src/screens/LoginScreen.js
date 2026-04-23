// src/screens/LoginScreen.js
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation, setSesionActiva }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Completa tu correo y contraseña.');
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setSesionActiva(true);
      navigation.replace('App');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Franja naranja superior */}
      <View style={styles.topAccent} />

      <View style={styles.inner}>
        {/* Logo / icono */}
        <View style={styles.logoBox}>
          <Text style={styles.logoEmoji}>🏗️</Text>
        </View>
        <Text style={styles.titulo}>Mi Obra Digital</Text>
        <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#6B6B6B"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#6B6B6B"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.btnPrimary, loading && styles.btnDisabled]}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.btnPrimaryText}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.7}>
          <Text style={styles.linkText}>
            ¿No tienes cuenta?{' '}
            <Text style={styles.linkAccent}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  topAccent: {
    height: 4,
    backgroundColor: '#F5A623',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#F5A623',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  logoEmoji: { fontSize: 36 },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: { marginBottom: 24 },
  label: {
    fontSize: 12,
    color: '#B0B0B0',
    marginBottom: 6,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 8,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 16,
  },
  btnPrimary: {
    backgroundColor: '#F5A623',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  linkText: {
    textAlign: 'center',
    color: '#B0B0B0',
    fontSize: 14,
  },
  linkAccent: {
    color: '#F5A623',
    fontWeight: '600',
  },
});
