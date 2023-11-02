import {HStack, Icon, Text, VStack} from '@gluestack-ui/themed';
import {
  Compass,
  HomeIcon,
  MessageCircle,
  ScrollText,
  User,
} from 'lucide-react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {};

const BottomNavigationBar = (props: Props) => {
  return (
    <HStack
      w="100%"
      alignItems="center"
      pl="$5"
      pt="$3"
      pr="$5"
      pb="$3"
      bg="$white"
      mt="$5"
      justifyContent="space-between"
      position="absolute"
      bottom={0}>
      <TouchableOpacity>
        <VStack gap="$2" alignItems="center">
          <Icon as={HomeIcon} size="xl" color="$trueGray500" />
          <Text fontWeight="$bold" size="sm" color="$trueGray400">
            Home
          </Text>
        </VStack>
      </TouchableOpacity>
      <TouchableOpacity>
        <VStack gap="$2" alignItems="center">
          <Icon as={Compass} size="xl" color="$trueGray500" />
          <Text fontWeight="$bold" size="sm" color="$trueGray400">
            Explore
          </Text>
        </VStack>
      </TouchableOpacity>
      <TouchableOpacity>
        <VStack gap="$2" alignItems="center">
          <Icon as={ScrollText} size="xl" color="$trueGray500" />
          <Text fontWeight="$bold" size="sm" color="$trueGray400">
            Wishlist
          </Text>
        </VStack>
      </TouchableOpacity>
      <TouchableOpacity>
        <VStack gap="$2" alignItems="center">
          <Icon as={MessageCircle} size="xl" color="$trueGray500" />
          <Text fontWeight="$bold" size="sm" color="$trueGray400">
            Message
          </Text>
        </VStack>
      </TouchableOpacity>
      <TouchableOpacity>
        <VStack gap="$2" alignItems="center">
          <Icon as={User} size="xl" color="$trueGray500" />
          <Text fontWeight="$bold" size="sm" color="$trueGray400">
            Profile
          </Text>
        </VStack>
      </TouchableOpacity>
    </HStack>
  );
};

export default BottomNavigationBar;
