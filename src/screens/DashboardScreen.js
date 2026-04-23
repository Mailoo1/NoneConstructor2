// src/screens/DashboardScreen.js
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const cards = [
  { label: 'Objetivos',  icon: 'flag',      valor: '4/6',   color: '#2E86AB', badge: 'info' },
  { label: 'Avances',    icon: 'clipboard', valor: '3 hoy', color: '#4CAF50', badge: 'success' },
  { label: 'Materiales', icon: 'cube',      valor: '12',    color: '#FF9500', badge: 'pending' },
  { label: 'Personal',   icon: 'people',    valor: '8',     color: '#F5A623', badge: null },
  { label: 'Planos',     icon: 'map',       valor: '5',     color: '#6B6B6B', badge: null },
  { label: 'Fotos',      icon: 'camera',    valor: '24',    color: '#E4572E', badge: null },
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      const sesion = await AsyncStorage.getItem('sesion');
      if (sesion) setUsuario(JSON.parse(sesion));
    };
    cargarUsuario();
  }, []);

  const cerrarSesion = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('sesion');
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.titulo}>Mi Obra Digital</Text>
          <Text style={styles.subtitulo}>
            Hola, {usuario ? usuario.nombre : 'bienvenido'} 👷
          </Text>
        </View>
        <TouchableOpacity style={styles.btnSalir} onPress={cerrarSesion} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      {/* Banner de estado */}
      <View style={styles.banner}>
        <View style={styles.bannerIndicator} />
        <View>
          <Text style={styles.bannerTitulo}>Proyecto activo</Text>
          <Text style={styles.bannerSub}>Torre Residencial Norte · En proceso</Text>
        </View>
        <View style={styles.bannerBadge}>
          <Text style={styles.bannerBadgeText}>🟠 Activo</Text>
        </View>
      </View>

      {/* Separador con label */}
      <View style={styles.seccionHeader}>
        <Text style={styles.seccionTitulo}>Módulos</Text>
        <View style={styles.seccionLine} />
      </View>

      {/* Grid de cards */}
      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity key={card.label} style={styles.card} activeOpacity={0.75}>
            <View style={[styles.iconBox, { backgroundColor: card.color + '22', borderColor: card.color + '44' }]}>
              <Ionicons name={card.icon} size={24} color={card.color} />
            </View>
            <Text style={styles.cardValor}>{card.valor}</Text>
            <Text style={styles.cardLabel}>{card.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Acciones rápidas */}
      <View style={styles.seccionHeader}>
        <Text style={styles.seccionTitulo}>Acciones rápidas</Text>
        <View style={styles.seccionLine} />
      </View>

      <View style={styles.accionesRow}>
        <TouchableOpacity style={[styles.accion, styles.accionPrimary]} activeOpacity={0.8}>
          <Ionicons name="add-circle-outline" size={18} color="#1E1E1E" />
          <Text style={styles.accionTextPrimary}>Nuevo avance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.accion, styles.accionSecondary]} activeOpacity={0.8}>
          <Ionicons name="camera-outline" size={18} color="#F5A623" />
          <Text style={styles.accionTextSecondary}>Agregar foto</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E', paddingHorizontal: 16 },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  headerLeft: {},
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  subtitulo: { fontSize: 13, color: '#B0B0B0', marginTop: 2 },
  btnSalir: {
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },

  // Banner
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    gap: 10,
  },
  bannerIndicator: {
    width: 3,
    height: 36,
    borderRadius: 2,
    backgroundColor: '#FF9500',
  },
  bannerTitulo: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  bannerSub: { fontSize: 12, color: '#B0B0B0', marginTop: 2 },
  bannerBadge: {
    marginLeft: 'auto',
    backgroundColor: '#FF950022',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF950055',
  },
  bannerBadgeText: { fontSize: 11, color: '#FF9500', fontWeight: '600' },

  // Sección
  seccionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  seccionTitulo: { fontSize: 12, color: '#6B6B6B', letterSpacing: 1, textTransform: 'uppercase', fontWeight: '600' },
  seccionLine: { flex: 1, height: 1, backgroundColor: '#3A3A3A' },

  // Grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  card: {
    width: '47%',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
  },
  cardValor: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  cardLabel: { fontSize: 12, color: '#B0B0B0', marginTop: 2, letterSpacing: 0.3 },

  // Acciones rápidas
  accionesRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  accion: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 8,
    padding: 14,
  },
  accionPrimary: {
    backgroundColor: '#F5A623',
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  accionSecondary: {
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#F5A623',
  },
  accionTextPrimary: { color: '#1E1E1E', fontWeight: 'bold', fontSize: 14 },
  accionTextSecondary: { color: '#F5A623', fontWeight: '600', fontSize: 14 },
});
