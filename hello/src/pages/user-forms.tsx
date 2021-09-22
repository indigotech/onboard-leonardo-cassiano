import React, { useState } from 'react';
import { SafeAreaView, View, Alert, Picker } from 'react-native';
import { emailvalidator, dateValidator, dateFormatValidator } from '../validator';
import { Navigation, NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { ApolloProvider, gql, useMutation } from '@apollo/client';
import { client } from '../client';
import { StyledButton, StyledText, StyledPicker } from '../styles';
import { InputSection } from '../components/input-section';

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

const UserForms: NavigationFunctionComponent = (props: NavigationComponentProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [createUser, { loading }] = useMutation<{ createUser: User }>(CREATE_USER, {
    onError(error) {
      Alert.alert(error.message);
    },
    onCompleted() {
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
      await createUser({ variables: { name, email, phone, birthDate, role } });
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <InputSection label='Nome' input={name} onChange={setName}></InputSection>
        <InputSection label='Telefone' input={phone} onChange={setPhone}></InputSection>
        <InputSection label='Data de nascimento' input={birthDate} onChange={setBirthDate}></InputSection>
        <InputSection label='Email' input={email} onChange={setEmail}></InputSection>
        <StyledText>Cargo</StyledText>
        <StyledPicker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)}>
          <Picker.Item label='User' value='user' />
          <Picker.Item label='Admin' value='admin' />
        </StyledPicker>
        <StyledButton title='Adicionar novo usuário' onPress={handleSubmit} />
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
