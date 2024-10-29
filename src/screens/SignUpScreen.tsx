import React, { useState } from 'react';
import { NativeBaseProvider, Box, Button, Input, Center, Text, Alert } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!username) {
      setError('Nome de usuário é obrigatório.');
      return false;
    }
    if (!password) {
      setError('Senha é obrigatória.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('As senhas não correspondem.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setError('');
    if (validateForm()) {
      // Armazena os dados no AsyncStorage
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      navigation.navigate('Login'); // Navega para a tela de Login após o cadastro
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="purple">
        <Box width="90%" maxWidth="300px">
          {error && <Alert w="100%" status="error" mb={4}><Text color="red.500">{error}</Text></Alert>}

          <Input 
            placeholder="Nome de Usuário" 
            mb={4} 
            value={username} 
            onChangeText={setUsername} 
          />
          <Input 
            placeholder="Senha" 
            mb={4} 
            secureTextEntry 
            value={password} 
            onChangeText={setPassword} 
          />
          <Input 
            placeholder="Confirmar Senha" 
            mb={4} 
            secureTextEntry 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
          />

          <Button colorScheme="purple" onPress={handleSignUp}>
            Criar Conta
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default SignUpScreen;
