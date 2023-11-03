import {
  Box,
  Button,
  ButtonText,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {Menu} from 'lucide-react-native';
import React, {useContext} from 'react';
import {Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import {AuthContext} from '../context/AuthProvider';

type Props = {
  navigation: any;
};

const Home = ({navigation}: Props) => {
  const {status, logout} = useContext(AuthContext);
  if (!status) navigation.navigate('Login');
  return (
    <SafeAreaView>
      <VStack
        gap="$5"
        w="100%"
        p="$4"
        bg="$white"
        minHeight={Dimensions.get('window').height}>
        <HStack justifyContent="space-between">
          <Heading size="lg">{`Hi, ${status?.firstName}`}</Heading>
          <TouchableOpacity>
            <Box
              p={10}
              borderWidth={1}
              borderColor="$trueGray200"
              borderRadius="$full">
              <Icon as={Menu} size="xl" />
            </Box>
          </TouchableOpacity>
        </HStack>
        <Text size="md">{`First Name: ${status?.firstName}`}</Text>
        <Text size="md">{`Last Name: ${status?.lastName}`}</Text>
        <Text size="md">{`Email: ${status?.email}`}</Text>
        <Button
          action="negative"
          mt="$10"
          onPress={() => {
            logout();
            navigation.navigate('Login');
          }}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default Home;
