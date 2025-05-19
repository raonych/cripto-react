import React from 'react';
import { View, Text, StyleSheet, Button, Alert} from 'react-native';
import { createCripto } from './Api';

export default function Cadastro({ navigation }) {
  const [nomeCripto, setNomeCripto] = useState(cripto.nomeCripto);
  const [siglaCripto, setSiglaCripto] = useState(cripto.siglaCripto);


  const handleSubmit = async () =>{
    if (!nomeCripto || !siglaCripto) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de castrar.');
      return;
    }

    const newCripto = {
      nome: nomeCripto,
      sigla: siglaCripto,
    };

    try {
      await createCripto(newCripto);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso', [
        {text: 'Ok', onPress: () => navigation.navigate('Home') },
      ]);
      setNomeCripto('');
      setSiglaCripto('');
    }catch(error){
      Alert.alert('Erro', 'Não foi possível cadastrar a cripto.');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da Cripto"
        value={nomeCripto}
        onChangeText={setNomeCripto}
        style={styles.input}
      />
      <TextInput
        placeholder="Sigla da Cripto"
        value={siglaCripto}
        onChangeText={setSiglaCripto}
        style={styles.input}
      />
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});
