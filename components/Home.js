import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Página Home</Text>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.textoBotao}>Ir para Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Alterar')}>
        <Text style={styles.textoBotao}>Ir para Alterar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#FFF',
  },
});
