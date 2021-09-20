import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, Button, Alert, Picker } from 'react-native';
import { emailvalidator, dateValidator, dateFormatValidator } from '../validator';
import { Navigation, NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { Props } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';
import { addUser } from '../addUser';
import { styles } from '../styles';
import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation ($name: String!, $email: String!, $phone: String!, $birthDate: Date!) {
    createUser(data: { name: $name, email: $email, phone: $phone, birthDate: $birthDate, role: user }) {
      id
      name
    }
  }
`;

export const UserForms: NavigationFunctionComponent<Props> = (props: NavigationComponentProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!emailvalidator(email)) {
      Alert.alert('Email Inválido');
    } else if (!dateFormatValidator(birthDate)) {
      Alert.alert('A data de nascimento deve ter a forma AAAA-MM-DD');
    } else if (!dateValidator(birthDate)) {
      Alert.alert('A data de nascimento é inválida');
    } else {
      setLoading(true);
      if (await addUser(name, email, phone, birthDate, role)) {
        setLoading(false);
        Navigation.pop(props.componentId);
      } else {
        setLoading(false);
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
