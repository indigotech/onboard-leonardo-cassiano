import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { gql } from '@apollo/client';
import { StyledDetailsName, StyledDetails, StyledItem } from '../styles';
import { client } from '../client';

const queryUser = async (id: string): Promise<JSON> => {
  try {
    const result = await client.query({
      query: gql`
      query{
        user(id: "${id}"){
          id
          name
          phone
          birthDate
          email
          role
        }
      }
    `,
    });
    const jsonString = JSON.stringify(result);
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    Alert.alert(error.message);
    return error;
  }
};

const UserComponent: React.FC<{
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  role: string;
}> = ({ name, email, phone, birthDate, role }) => {
  return (
    <StyledItem>
      <StyledDetailsName>{name}</StyledDetailsName>
      <StyledDetails>{phone}</StyledDetails>
      <StyledDetails>{birthDate}</StyledDetails>
      <StyledDetails>{email}</StyledDetails>
      <StyledDetails>{role}</StyledDetails>
    </StyledItem>
  );
};

const UserDetails = (props) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  async function fetchList() {
    const jsonData = await queryUser(props.id);
    const jsonString = JSON.stringify(jsonData);
    const data = JSON.parse(jsonString);
    setName(data.data.user.name);
    setPhone(data.data.user.phone);
    setBirthDate(data.data.user.birthDate);
    setEmail(data.data.user.email);
    setRole(data.data.user.role);
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetchList();
      setLoading(false);
    }
  });

  return (
    <SafeAreaView>
      <View>
        <UserComponent name={name} phone={phone} birthDate={birthDate} email={email} role={role} />
      </View>
    </SafeAreaView>
  );
};

UserDetails.options = {
  topBar: {
    title: {
      text: 'Detalhes do usuário',
    },
  },
};

export default UserDetails;
