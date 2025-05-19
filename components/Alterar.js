import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import {updateCripto} from './Api';

export default function Alterar({route, navigation}) {
  const {cripto} = route.params;
  const [nomeCripto, setNomeCripto] = useState(cripto.nomeCripto);
  const [siglaCripto, setSiglaCripto] = useState(cripto.siglaCripto);

  const handleUpdate = () =>{
    const updateData = {
      nomeCripto,
      siglaCripto
    };

    Alert.alert(
      'Confirmação',
      'Tem certeza de que desja alterar esta Cripto?',
      [
        {text:Cancelar, style:'cancel'},
        {
          text:'Alterar',
          onPress:() => updateCripto(cripto, updateData, navigation),
        },
      ]
    );
  };

  
  return (
    <View style={styles.container}>
            <TextInput
            placeholder="Nome da Cripto"
            value={nomeCripto}
            onChangeText={setNomeCripto}
            />
            <TextInput
            placeholder="Sigla da Cripto"
            value={siglaCripto}
            onChangeText={setSiglaCripto}
            />

            <Button title="Alterar" onPress={handleUpdate}/>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
