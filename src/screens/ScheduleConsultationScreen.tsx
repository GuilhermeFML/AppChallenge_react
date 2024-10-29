import React, { useState } from 'react';
import { NativeBaseProvider, Box, Button, Center, Select, Text } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type ScheduleConsultationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ScheduleConsultation'
>;

type Props = {
  navigation: ScheduleConsultationScreenNavigationProp;
};

const ScheduleConsultationScreen = ({ navigation }: Props) => {
  const [selectedTime, setSelectedTime] = useState('');

  // Função para gerar opções de horário
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour.toString().padStart(2, '0') + ':00'; // Formata para "00:00", "01:00", etc.
      times.push(
        <Select.Item key={formattedHour} label={formattedHour} value={formattedHour} />
      );
    }
    return times;
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <Box width="90%" maxWidth="300px">
          <Select
            placeholder="Selecione a farmácia"
            mb={4}
          >
            <Select.Item label="Farmacia 1" value="farma1" />
            <Select.Item label="Farmacia 2" value="farma2" />
            <Select.Item label="Farmacia 3" value="farma3" />
          </Select>

          <Select
            placeholder="Selecione o horário"
            mb={4}
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
          >
            {generateTimeOptions()} {/* Gera as opções de horário */}
          </Select>

          <Button colorScheme="purple" onPress={() => navigation.navigate('ConfirmAppointment')}>
            Consultar
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ScheduleConsultationScreen;
