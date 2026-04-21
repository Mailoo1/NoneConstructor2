import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const cards = [
  { label: 'Objetivos',  icon: 'flag',      valor: '4/6',   color: '#3B82F6' },
  { label: 'Avances',    icon: 'clipboard', valor: '3 hoy', color: '#10B981' },
  { label: 'Materiales', icon: 'cube',      valor: '12',    color: '#F59E0B' },
  { label: 'Personal',   icon: 'people',    valor: '8',     color: '#8B5CF6' },
  { label: 'Planos',     icon: 'map',       valor: '5',     color: '#EC4899' },
  { label: 'Fotos',      icon: 'camera',    valor: '24',    color: '#14B8A6' },
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
          onPress: async () => {
            await AsyncStorage.removeItem('sesion');
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Mi Obra Digital</Text>
          <Text style={styles.subtitulo}>
            Hola, {usuario ? usuario.nombre : 'bienvenido'} 👷
          </Text>
        </View>
        <TouchableOpacity style={styles.btnSalir} onPress={cerrarSesion}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity key={card.label} style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: card.color }]}>
              <Ionicons name={card.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.cardValor}>{card.valor}</Text>
            <Text style={styles.cardLabel}>{card.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#111827', padding: 16 },
  header:     { flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 20, marginTop: 8 },
  titulo:     { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  subtitulo:  { fontSize: 14, color: '#9CA3AF', marginTop: 2 },
  btnSalir:   { backgroundColor: '#1F2937', padding: 10, borderRadius: 10 },
  grid:       { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card:       { width: '47%', backgroundColor: '#1F2937', borderRadius: 12,
                padding: 16, marginBottom: 16, alignItems: 'center' },
  iconBox:    { width: 48, height: 48, borderRadius: 24, justifyContent: 'center',
                alignItems: 'center', marginBottom: 10 },
  cardValor:  { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  cardLabel:  { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
});