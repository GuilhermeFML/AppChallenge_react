import React, { useState } from 'react';
import { NativeBaseProvider, Box, Button, Input, Center, Text, Alert } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; 

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    
    if (!username) {
      setError('Por favor, insira um nome de usuário.');
      return;
    }
    if (!password) {
      setError('A senha não pode estar vazia.');
      return;
    }

  
    const storedUsername = await AsyncStorage.getItem('username');
    const storedPassword = await AsyncStorage.getItem('password');

   
    if (username !== storedUsername || password !== storedPassword) {
      setError('Nome de usuário ou senha incorretos.');
      return;
    }

    setError(''); 
    navigation.navigate('ConsultationsList');
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <Box width="90%" maxWidth="300px">
          {error ? (
            <Alert w="100%" status="error" mb={4}>
              <Text color="red.500">{error}</Text>
            </Alert>
          ) : null}

          <Input
            placeholder="Usuário"
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
          <Button colorScheme="purple" onPress={handleLogin} mb={2}>
            Entrar
          </Button>
          <Button colorScheme="purple" onPress={() => navigation.navigate('SignUp')} mt={2}>
            Cadastrar
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default LoginScreen;
