import React, { useState } from 'react';
import { io } from 'socket.io-client';

// Custom components
import { Stepper } from './components/Stepper';
import { SystemStep, ControlStep, TuningStep } from './components/Steps';

// Chakra-UI components
import {
  ChakraProvider,
  extendTheme,
  Box,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

function App() {
  const socket = io('http://localhost:5000');

  const [control, setControl] = useState('PID');
  const [algorithm, setAlgorithm] = useState('Ziegler-Nichols');

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" alignItems="center" w="100%">
        <Box mb={10} mt={10}>
          <Heading color="teal.200" as="h1" size="3xl">
            PID Tuner
          </Heading>
          <Text color="gray.400" fontSize="3xl">
            A simple way to tune your PID system
          </Text>
        </Box>

        <Stepper>
          <SystemStep socket={socket} />
          <ControlStep socket={socket} state={{ control, setControl }} />
          <TuningStep
            socket={socket}
            state={{ algorithm, setAlgorithm }}
            control={control}
          />
        </Stepper>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
