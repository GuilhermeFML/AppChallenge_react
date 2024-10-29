import React from 'react';
import { NativeBaseProvider, Box, Button, Center, Text } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type ConfirmAppointmentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConfirmAppointment'
>;

type Props = {
  navigation: ConfirmAppointmentScreenNavigationProp;
};

const ConfirmAppointmentScreen = ({ navigation }: Props) => {
  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <Box>
          <Text>A farmácia está aberta nesse horário!</Text>
          <Button colorScheme="purple" mt={4} onPress={() => navigation.navigate('ConsultationsList')}>
            Voltar para lista de farmácias
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ConfirmAppointmentScreen;
