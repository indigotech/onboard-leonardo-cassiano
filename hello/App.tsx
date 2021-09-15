import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { emailvalidator, passwordValidator } from './src/validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

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
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {}]}>{title}</Text>
      <Text style={[styles.sectionDescription, {}]}>{children}</Text>
    </View>
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
      const jsonString = JSON.stringify(error);
      const data = JSON.parse(jsonString);
      Alert.alert(error.message);
      return null;
    });
};

const App = () => {
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
        console.log('Deu certo');
        setLoading(false);
      } else {
        setLoading(false);
        console.log('Deu ruim');
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        {loading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size='large' color='#00ff00' />
          </View>
        ) : (
          <>
            <Section title='Bem-vindo(a) à Taqtile!' />
            <Text>E-mail</Text>
            <TextInput style={styles.input} onChangeText={setEmail} value={email} />
            <Text>Senha</Text>
            <TextInput style={styles.input} onChangeText={setPassword} value={password} />
            <Button title='Entrar' onPress={handleSubmit} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  button: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 350,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
