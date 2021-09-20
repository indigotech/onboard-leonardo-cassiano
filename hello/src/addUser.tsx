import { Alert } from 'react-native';
import { gql, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(`@storage_Key`);
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : ``,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

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
