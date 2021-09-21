import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, Button, Alert, Picker } from 'react-native';
import { emailvalidator, dateValidator, dateFormatValidator } from '../validator';
import { Navigation, NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { styles } from '../styles';
import { ApolloProvider, gql, useMutation } from '@apollo/client';
import { client } from '../client';

interface User {
  id: string;
  name: string;
}

const CREATE_USER = gql`
  mutation ($name: String!, $email: String!, $phone: String!, $birthDate: Date!, $role: UserRole!) {
    createUser(data: { name: $name, email: $email, phone: $phone, birthDate: $birthDate, role: $role }) {
      id
      name
    }
  }
`;

export const UserFormsProvider: NavigationFunctionComponent = (props) => (
  <ApolloProvider client={client}>
    <UserForms {...props} />
  </ApolloProvider>
);

export const UserForms: NavigationFunctionComponent = (props: NavigationComponentProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [createUser, {loading}] = useMutation<{createUser: User}>(CREATE_USER, {
    onError(error){
      Alert.alert(error.message);
    },
    onCompleted(){
      Alert.alert('Usuário cadastrado com sucesso');
      Navigation.pop(props.componentId);
    },
  });

  const handleSubmit = async () => {
    if (!emailvalidator(email)) {
      Alert.alert('Email Inválido');
    } else if (!dateFormatValidator(birthDate)) {
      Alert.alert('A data de nascimento deve ter a forma AAAA-MM-DD');
    } else if (!dateValidator(birthDate)) {
      Alert.alert('A data de nascimento é inválida');
    } else {
      setIsLoading(true);
      await createUser({variables : {name, email, phone, birthDate, role}});
      setIsLoading(false);
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
        <Picker selectedValue={role} style={styles.input} onValueChange={(itemValue) => setRole(itemValue)}>
          <Picker.Item label='User' value='user' />
          <Picker.Item label='Admin' value='admin' />
        </Picker>
        <Button title='Adicionar novo usuário' onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

UserForms.options = {
  topBar: {
    title: {
      text: 'Adicionar usuário',
    },
  },
};
