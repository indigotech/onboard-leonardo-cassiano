import { Alert } from 'react-native';
import { gql  } from '@apollo/client';
import { client } from './client';

export const addUser = (name: string, email: string, phone: string, birthDate: string, role: string) => {
  return client
    .mutate({
      mutation: gql`
        mutation{
          createUser(data: {name: "${name}", email: "${email}", phone: "${phone}", birthDate: "${birthDate}", role: ${role}}){
            id
            name
            phone
            birthDate
            email
            role
          }
        }
        
        `,
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      Alert.alert(error.message);
      return null;
    });
};
