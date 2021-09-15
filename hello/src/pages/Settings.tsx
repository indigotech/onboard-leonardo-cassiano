import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, Alert } from 'react-native';
import { ApolloClient, gql, InMemoryCache, createHttpLink } from '@apollo/client';
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

const queryList = async (offset: number, limit: number): Promise<JSON> => {
  try {
    const result = await client.query({
      query: gql`
      query {
        users (pageInfo:{
          offset: ${offset}
          limit: ${limit}
        }){
          nodes {
            id
            name
            email
          }
        }
      }
    `,
      /**})
      .then((result) => {
        const jsonString = JSON.stringify(result);
        const data = JSON.parse(jsonString);
        console.log(data.data.users.nodes);
        return result;**/
    });
    const jsonString = JSON.stringify(result);
    const data = JSON.parse(jsonString);
    return data.data.users.nodes;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    Alert.alert(error.message);
    return error;
  }
};

const ItemComponent: React.FC<{
  name: string;
  email: string;
}> = ({ name, email }) => {
  return (
    <View style={styles.item}>
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  );
};

interface Info {
  name: string;
  email: string;
  id: string;
}

interface Item {
  item: Info;
}

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const limit = 20;
  const offset = 0;
  const renderItem = ({ item }: Item) => <ItemComponent name={item.name} email={item.email} />;

  async function fetchList() {
    const nodes = await queryList(offset, limit);
    setList(list.concat(nodes));
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetchList().finally(() => {
        setLoading(false);
      });
    }
  }, [offset]);

  return (
    <SafeAreaView>
      <View>
        <FlatList data={list} keyExtractor={(item) => item.id} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#A7AED3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Settings;
