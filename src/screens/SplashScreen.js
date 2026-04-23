// src/screens/SplashScreen.js
import { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { colors } from "../config/theme";

export default function SplashScreen({ navigation }) {
  const opacidad = new Animated.Value(0);
  const escala = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacidad, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(escala, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {}, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topAccent} />

      <Animated.View
        style={[styles.contenido, { opacity: opacidad, transform: [{ scale: escala }] }]}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icono}>🏗️</Text>
        </View>
        <Text style={styles.titulo}>Mi Obra Digital</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitulo}>
          Gestión de proyectos de construcción
        </Text>
      </Animated.View>

      <Animated.View style={[styles.footer, { opacity: opacidad }]}>
        <View style={styles.puntos}>
          <View style={[styles.punto, styles.puntoActivo]} />
          <View style={styles.punto} />
          <View style={styles.punto} />
        </View>
        <Text style={styles.footerTexto}>Cargando...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topAccent: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 4,
    backgroundColor: '#F5A623',
  },
  contenido: { alignItems: 'center' },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#F5A623',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icono: { fontSize: 52 },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  divider: {
    width: 48,
    height: 3,
    backgroundColor: '#F5A623',
    borderRadius: 2,
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
    paddingHorizontal: 40,
    letterSpacing: 0.3,
  },
  footer: { position: 'absolute', bottom: 60, alignItems: 'center' },
  puntos: { flexDirection: 'row', marginBottom: 12 },
  punto: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#3A3A3A',
    marginHorizontal: 4,
  },
  puntoActivo: { backgroundColor: '#F5A623', width: 24, borderRadius: 4 },
  footerTexto: { color: '#808080', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
});
