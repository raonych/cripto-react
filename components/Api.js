const API_URL = 'http://localhost:8000/api/cripto';
import { Alert } from 'react-native';

export const fetchCripto = async (setRegistros) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao buscar Criptos');
    const data = await response.json();
    setRegistros(data);
  } catch (error) {
    console.error('Erro ao buscar Criptos:', error);
    throw error;
  }
};

export const createCripto = async (CriptoData) => {
  try {
    const response = await fetch('http://localhost:8000/api/cripto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(CriptoData),
    });

    if (response.status === 204) {
      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
      return {};
    }

    const textResponse = await response.text();
    console.log('Resposta bruta da API:', textResponse);

    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn('A resposta não é um JSON válido.');
      responseData = null;
    }

    if (!response.ok || !responseData) {
      throw new Error(responseData?.message || 'Erro desconhecido na API');
    }

    return responseData;
  } catch (error) {
    console.error('Erro ao cadastrar Cripto:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return null;
  }
};

export const deleteCripto = async (CriptoId, setRegistros) => {
  try {
    const response = await fetch(`http://localhost:8000/api/cripto/${CriptoId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.success) {
        Alert.alert('Sucesso!', responseData.message);
        setRegistros((prevRegistros) => {
          const novaLista = prevRegistros.filter((Cripto) => Cripto.codigo !== CriptoId);
          return novaLista;
        });
      } else {
        Alert.alert('Erro', responseData.message);
      }
    } else {
      const textResponse = await response.text();
      let responseData = null;

      try {
        responseData = JSON.parse(textResponse);
      } catch {
        console.warn('A resposta não é um JSON válido.');
      }

      throw new Error(responseData?.message || 'Erro desconhecido ao excluir o Cripto');
    }
  } catch (error) {
    console.error('Erro ao excluir Cripto:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};

export const updateCripto = async (CriptoId, updatedData, navigation) => {
  try {
    const response = await fetch(`http://localhost:8000/api/cripto/${CriptoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    console.log('Dados enviados:', updatedData);

    if (response.status === 200) {
      Alert.alert('Sucesso!', 'Cripto atualizada com sucesso!');
      navigation.navigate('Home');
    } else {
      const textResponse = await response.text();
      let responseData = null;

      try {
        responseData = JSON.parse(textResponse);
      } catch {
        console.warn('A resposta não é um JSON válido.');
      }

      throw new Error(responseData?.message || 'Erro desconhecido ao atualizar o Cripto');
    }
  } catch (error) {
    console.error('Erro ao atualizar Cripto:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};
