import {Box, HStack, Heading, Icon, VStack} from '@gluestack-ui/themed';
import {Menu} from 'lucide-react-native';
import React from 'react';
import {Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';

type Props = {
  navigation: any;
};

const Home = ({navigation}: Props) => {
  return (
    <SafeAreaView>
      <VStack
        gap="$3"
        w="100%"
        p="$4"
        bg="$white"
        minHeight={Dimensions.get('window').height}>
        <HStack justifyContent="space-between">
          <Heading size="lg">Hi, User</Heading>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Box
              p={10}
              borderWidth={1}
              borderColor="$trueGray200"
              borderRadius="$full">
              <Icon as={Menu} size="xl" />
            </Box>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Home;
