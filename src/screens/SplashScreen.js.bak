import { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

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

    const timer = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.contenido,
          { opacity: opacidad, transform: [{ scale: escala }] },
        ]}
      >
        <Text style={styles.icono}>🏗️</Text>
        <Text style={styles.titulo}>Mi Obra Digital</Text>
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
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  contenido: { alignItems: "center" },
  icono: { fontSize: 80, marginBottom: 20 },
  titulo: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  subtitulo: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  footer: { position: "absolute", bottom: 60, alignItems: "center" },
  puntos: { flexDirection: "row", marginBottom: 12 },
  punto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#374151",
    marginHorizontal: 4,
  },
  puntoActivo: { backgroundColor: "#F97316", width: 24 },
  footerTexto: { color: "#6B7280", fontSize: 13 },
});