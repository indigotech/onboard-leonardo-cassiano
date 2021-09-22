import React, { useState } from 'react';
import { SafeAreaView, View, Alert, ActivityIndicator } from 'react-native';
import { gql } from '@apollo/client';
import { emailvalidator, passwordValidator } from './src/validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { client } from './src/client';
import { InputSection } from './src/components/input-section';
import { StyledContainer, StyledTitle, StyledDescription, StyledButton, StyledLoadingIndicator } from './src/styles';

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    Alert.alert(e);
  }
};

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{children}</StyledDescription>
    </StyledContainer>
  );
};

const login = (email: string, password: string) => {
  return client
    .mutate({
      mutation: gql`
      mutation {
        login (data:{
          email: "${email}"
          password: "${password}"
        }){
          token
        }
      }
    `,
    })
    .then((result) => {
      const jsonString = JSON.stringify(result);
      const data = JSON.parse(jsonString);
      storeData(data.data.login.token);
      return result;
    })
    .catch((error) => {
      Alert.alert(error.message);
      return null;
    });
};

const App = (props: NavigationComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async () => {
    if (!emailvalidator(email) || !passwordValidator(password)) {
      if (!emailvalidator(email) && !passwordValidator(password)) {
        Alert.alert('Email e senha inválidos');
        setEmailError(true);
        setPasswordError(true);
      } else if (!passwordValidator(password)) {
        Alert.alert('Senha Inválida');
        setEmailError(false);
        setPasswordError(true);
      } else {
        Alert.alert('Email Inválido');
        setEmailError(true);
        setPasswordError(false);
      }
    } else {
      setLoading(true);
      setEmailError(false);
      setPasswordError(false);
      if (await login(email, password)) {
        setLoading(false);
        Navigation.push(props.componentId, {
          component: {
            name: 'Settings',
          },
        });
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        {loading ? (
          <StyledLoadingIndicator>
            <ActivityIndicator size='large' color='#00ff00' />
          </StyledLoadingIndicator>
        ) : (
          <>
            <Section title='Bem-vindo(a) à Taqtile!' />
            <InputSection label='Email' input={email} onChange={setEmail} onError={emailError}></InputSection>
            <InputSection label='Senha' input={password} onChange={setPassword} onError={passwordError}></InputSection>
            <StyledButton title='Entrar' onPress={handleSubmit} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
