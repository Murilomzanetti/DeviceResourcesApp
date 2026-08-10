// src/components/ImagePickerComponent.js

// Importa as bibliotecas necessárias
import React, { useState } from 'react';
import { View, Image, Alert, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ActionButton from './ActionButton';

// Define o componente funcional
const ImagePickerComponent = () => {
  // Estado para armazenar a URI da imagem selecionada
  const [imageUri, setImageUri] = useState(null);

  // Função para solicitar permissão e abrir a galeria
  const selectImage = async () => {
    // Solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Verifica se a permissão foi concedida
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Permissão para acessar a galeria foi negada.');
      return;
    }

    // Abre a galeria para seleção de imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // Apenas imagens
      allowsEditing: true, // Permite edição básica
      quality: 1, // Qualidade da imagem (1 é a melhor)
    });

    // Verifica se o usuário cancelou a operação
    if (result.canceled) {
      Alert.alert('Operação Cancelada!', 'Você cancelou a seleção de imagem');
      return;
    }

    // Define a URI da imagem selecionada no estado
    setImageUri(result.assets[0].uri);
  };

  // Remove da tela a imagem selecionada sem precisar recarregar a aplicação
  const removeImage = () => {
    setImageUri(null);
  };

  return (
    // Contêiner principal com estilo centralizado
    <View style={styles.container}>
      <Text style={styles.title}>Galeria de imagens</Text>
      <Text style={styles.description}>Selecione uma imagem armazenada no dispositivo.</Text>

      {/* Botão para selecionar imagem */}
      <ActionButton title="Selecionar Imagem" onPress={selectImage} />

      {/* Exibe a imagem selecionada, se houver */}
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }} // Fonte da imagem
            style={styles.image} // Estilo da imagem
          />

          {/* Remove a imagem selecionada sem atualizar a página */}
          <ActionButton title="Remover Imagem" onPress={removeImage} variant="danger" />
        </View>
      )}
    </View>
  );
};

// Define os estilos utilizados no componente
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center', // Centraliza horizontalmente
    padding: 24, // Espaçamento interno
    backgroundColor: '#fff', // Cor de fundo branca
    borderRadius: 18,
    boxShadow: '0 4px 10px rgba(15, 23, 42, 0.1)',
  },
  title: {
    alignSelf: 'stretch',
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    alignSelf: 'stretch',
    color: '#64748b',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 220, // Largura da imagem
    height: 220, // Altura da imagem
    marginTop: 20, // Espaçamento acima da imagem
    borderRadius: 14, // Bordas arredondadas
  },
});

// Exporta o componente para uso externo
export default ImagePickerComponent;
