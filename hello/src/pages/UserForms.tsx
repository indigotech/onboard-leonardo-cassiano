import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { emailvalidator, dateValidator, dateFormatValidator } from '../validator';

const UserForms = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async () => {
    if (!emailvalidator(email)) {
      Alert.alert('Email Inválido');
    } else if (!dateFormatValidator(birthDate)) {
      Alert.alert('A data de nascimento deve ter a forma AAAA-MM-DD');
    } else if (!dateValidator(birthDate)) {
      Alert.alert('A data de nascimento é inválida');
    } else {
      console.log('Só para testar mesmo');
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
