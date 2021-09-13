import React from 'react';
<<<<<<< HEAD
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
=======
import { Button, SafeAreaView, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, useMutation } from '@apollo/client';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        id
        birthDate
        name
        role
      }
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});
>>>>>>> d56e2419 (Apollo client working)

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
  
const onLogin = async()=>{

<<<<<<< HEAD
=======
const Title: React.FC<{ title: string }> = () => {
  const [mutate, { loading, data, error }] = useMutation(LOGIN, {
    variables: {
      email: 'admin@taqtile.com.br',
      password: '1234qwer',
    },
  });

  return (
    <>
      <Button onPress={() => mutate().then(console.log).catch(console.error)} title='Logar' />
      <Text> Loading: {loading && "LOADING"}</Text>
      <Text> Data: {data && data.toString()}</Text>
      <Text> Error: {error && error.toString()}</Text>
    </>
  );
};

const onLogin = (email: string, password: string) => {
  const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
  const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

  if (validEmailRegex.test(email) && validPasswordRegex.test(password)) {
    console.log('TODO');
  } else if (!validEmailRegex.test(email) && validPasswordRegex.test(password)) {
    Alert.alert('Email inválido');
  } else if (validEmailRegex.test(email) && !validPasswordRegex.test(password)) {
    Alert.alert('Senha inválida');
  } else {
    Alert.alert('Email e Senha inválidos');
  }
>>>>>>> d56e2419 (Apollo client working)
};

const App = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  return (
<<<<<<< HEAD
    <SafeAreaView>
        <View>
          <Section title="Bem-vindo(a) à Taqtile!"/>
          <Text>
            E-mail
          </Text>
          <TextInput
            style={styles.input}
            onChangeText = {setEmail}
            value = {email}
          />
          <Text>
            Senha
          </Text>
          <TextInput
            style={styles.input}
            onChangeText = {setPassword}
            value = {password}
          />
          <Button onPress={onLogin} title= "Entrar" />
        </View>
    </SafeAreaView>
=======
    <ApolloProvider client = {client}>
      <SafeAreaView>
        <View>
          <Section title='Bem-vindo(a) à Taqtile!' />
          <Text>E-mail</Text>
          <TextInput style={styles.input} onChangeText={setEmail} value={email} />
          <Text>Senha</Text>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} />
          <Button onPress={() => onLogin(email, password)} title='Entrar' />
          <Title title='Logar' />
        </View>
      </SafeAreaView>
    </ApolloProvider>
>>>>>>> d56e2419 (Apollo client working)
  );
};

/**render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);**/

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
});

export default App;