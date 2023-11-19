import {
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Heading,
  Icon,
  Input,
  InputField,
  Toast,
  ToastTitle,
  ToastDescription,
  VStack,
  useToast,
  Spinner,
} from '@gluestack-ui/themed';
import {AlertCircleIcon, Menu} from 'lucide-react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import {LoginType, loginSchema} from '../modules/Auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {AuthContext} from '../context/AuthProvider';

type Props = {
  navigation: any;
};

const LoginPage = ({navigation}: Props) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {login, status, isLoading: isAuthLoading} = useContext(AuthContext);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<LoginType>({resolver: zodResolver(loginSchema)});
  useEffect(() => {
    if (status) navigation.navigate('Home');
  }, [status]);
  const onSubmit = handleSubmit(async values => {
    try {
      setIsLoading(true);

      await login(values.email, values.password);
      setIsLoading(false);
      navigation.navigate('Home');
    } catch (err: any) {
      setIsLoading(false);
      toast.show({
        placement: 'top',
        render: ({id}) => {
          return (
            <Toast nativeID={'toast-' + id} action="error" variant="solid">
              <VStack space="xs">
                <ToastTitle>Login Failed</ToastTitle>
                <ToastDescription>
                  {err?.response?.data?.error?.message ??
                    err?.message ??
                    err?.toString()}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      console.error(err);
      throw err;
    }
  });

  if (isAuthLoading || status) {
    return (
      <SafeAreaView>
        <VStack
          gap="$3"
          w="100%"
          p="$6"
          alignItems={'center'}
          justifyContent={'center'}
          bg="$white"
          minHeight={Dimensions.get('window').height}>
          <Center>
            <Spinner size="large" />
          </Center>
        </VStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <VStack
        gap="$3"
        w="100%"
        p="$6"
        alignItems={'center'}
        justifyContent={'center'}
        bg="$white"
        minHeight={Dimensions.get('window').height}>
        <VStack justifyContent="space-between" w="100%" gap="$4">
          <Center>
            <Heading size="xl" fontWeight="$medium">
              LOGIN
            </Heading>
          </Center>
          <FormControl
            size="md"
            isInvalid={Boolean(errors?.email)}
            isReadOnly={false}
            isRequired={false}
            mt="$10">
            <FormControlLabel mb="$2">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="email"
              render={({field: {onChange}}) => (
                <Input>
                  <InputField
                    placeholder="Enter email"
                    onChangeText={e => onChange(e)}
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors?.email && errors?.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl
            size="md"
            isInvalid={Boolean(errors?.password)}
            isReadOnly={false}
            isRequired={false}>
            <FormControlLabel mb="$2">
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="password"
              render={({field: {onChange}}) => (
                <Input>
                  <InputField
                    type="password"
                    placeholder="Enter password"
                    onChangeText={e => onChange(e)}
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors?.email && errors?.password?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button
            size="xl"
            borderRadius="$2xl"
            mt="$7"
            onPress={() => onSubmit()}>
            {isLoading ? (
              <ButtonSpinner mr="$1" />
            ) : (
              <ButtonText>Login</ButtonText>
            )}
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default LoginPage;
