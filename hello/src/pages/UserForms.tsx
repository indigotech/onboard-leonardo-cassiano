import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { emailvalidator, dateValidator, dateFormatValidator } from '../validator';
import { gql, useMutation, InMemoryCache, ApolloClient } from '@apollo/client';
import { Navigation, NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { Props } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';

const CREATE_USER = gql`
  mutation ($name: String!, $email: String!, $phone: String!, $birthDate: Date!) {
    createUser(data: { name: $name, email: $email, phone: $phone, birthDate: $birthDate, role: user }) {
      id
      name
    }
  }
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const addUser = (name: string, email: string, phone: string, birthDate: string) => {
  return client
    .mutate({
      mutation: gql`
        mutation {
          createUser(data:{
            name: "${name}"
            email: "${email}"
            phone: "${phone}"
            birthDate: "${birthDate}"
          })
        }
      `,
    })
    .then((result) => {
      const jsonString = JSON.stringify(result);
      const data = JSON.parse(jsonString);
      console.log(data.data.login.token);
      return result;
    })
    .catch((err) => {
      const errorString = JSON.stringify(err);
      const error = JSON.parse(errorString);
      Alert.alert(error.message);
      return null;
    });
};

interface User {
  id: string;
  name: string;
}

export const UserForms: NavigationFunctionComponent<Props> = (props: NavigationComponentProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!emailvalidator(email)) {
      Alert.alert('Email Inválido');
    } else if (!dateFormatValidator(birthDate)) {
      Alert.alert('A data de nascimento deve ter a forma AAAA-MM-DD');
    } else if (!dateValidator(birthDate)) {
      Alert.alert('A data de nascimento é inválida');
    } else {
      console.log('Só para testar mesmo');
      setLoading(true);
      if (await addUser(name, email, phone, birthDate)) {
        console.log('Deu certo');
        Navigation.pop(props.componentId)
          .then(() => {
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
        console.log('Deu ruim');
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Nome</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />
        <Text>Telefone</Text>
        <TextInput style={styles.input} onChangeText={setPhone} value={phone} />
        <Text>Data de nascimento</Text>
        <TextInput style={styles.input} onChangeText={setBirthDate} value={birthDate} />
        <Text>E-mail</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} />
        <Text>Cargo</Text>
        <TextInput style={styles.input} onChangeText={setRole} value={role} />
        <Button title='Adicionar novo usuário' onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UserForms;
