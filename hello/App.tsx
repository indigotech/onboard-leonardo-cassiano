import React, { useState } from 'react';
import { SafeAreaView, View, Alert, ActivityIndicator } from 'react-native';
import { gql } from '@apollo/client';
import { emailvalidator, passwordValidator } from './src/validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { client } from './src/client';
import {
  StyledContainer,
  StyledTitle,
  StyledDescription,
  StyledInput,
  StyledText,
  StyledButton,
  StyledLoadingIndicator,
} from './src/styles';

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

  const handleSubmit = async () => {
    if (!emailvalidator(email)) {
      Alert.alert('Email Inválido');
    } else if (!passwordValidator(password)) {
      Alert.alert('Senha Inválida');
    } else {
      setLoading(true);
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
            <StyledText>E-mail</StyledText>
            <StyledInput onChangeText={setEmail} value={email} />
            <StyledText>Senha</StyledText>
            <StyledInput onChangeText={setPassword} value={password} />
            <StyledButton title='Entrar' onPress={handleSubmit} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
