import React from 'react';
import { NativeBaseProvider, Box, Button, Center, FlatList, Text } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type ConsultationsListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConsultationsList'
>;

type Props = {
  navigation: ConsultationsListScreenNavigationProp;
};

const mockConsultations = [
  { id: '1', nome: 'Farmácia 1', hora: '09:00', status: 'Aberta 24hrs', endereco: 'Av. Lins de Vasconcelos, 1505' },
  { id: '2', nome: 'Farmácia 2', hora: '23:00', status: 'Aberta 24hrs', endereco: 'Av. Lins de Vasconcelos, 1707' },
  { id: '3', nome: 'Farmácia 3', hora: '16:00', status: 'Aberta 24hrs', endereco: 'Av. Lins de Vasconcelos, 331' },
];

const ConsultationsListScreen = ({ navigation }: Props) => {
  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <Box>
          <FlatList
            data={mockConsultations}
            renderItem={({ item }) => (
              <Box borderBottomWidth="1" mb={4} p={2}>
                <Text>{item.nome}</Text>
                <Text>Horário: {item.hora}</Text>
                <Text>Status: {item.status}</Text>
                <Text>Endereço: {item.endereco}</Text>
                <Button colorScheme="purple" mt={2} onPress={() => navigation.navigate('ScheduleConsultation')}>
                  Detalhes
                </Button>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ConsultationsListScreen;
