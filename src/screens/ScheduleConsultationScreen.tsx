import React from 'react';
import { NativeBaseProvider, Box, Button, Input, Center, Select, CheckIcon } from 'native-base';
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
  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <Box>
          <Select placeholder="Selecione a farmácia" mb={4}>
            <Select.Item label="Farmacia 1" value="farma1" />
            <Select.Item label="Farmacia 2" value="farma2" />
            <Select.Item label="Farmacia 3" value="farma3" />
            
          </Select>
          <Input placeholder="Selecione o horário" mb={4} />
          <Button onPress={() => navigation.navigate('ConfirmAppointment')}>
            Agendar
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ScheduleConsultationScreen;