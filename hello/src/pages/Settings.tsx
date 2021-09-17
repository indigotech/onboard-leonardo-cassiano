import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { gql } from '@apollo/client';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { FloatingButton, ButtonSign, styles } from '../styles';
import { client } from '../client';

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
    });
    const jsonString = JSON.stringify(result);
    const data = JSON.parse(jsonString);
    return data.data.users.nodes;
  } catch (error) {
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

const Settings = (props: NavigationComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const limit = 20;
  const offset = 0;

  const renderItem = ({ item }: Item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          openDetails({ item });
        }}
      >
        <ItemComponent name={item.name} email={item.email} />
      </TouchableOpacity>
    );
  };

  const handlePress = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'UserForms',
      },
    });
  };

  const openDetails = ({ item }: Item) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Details',
        passProps: {
          id: item.id,
        },
      },
    });
  };

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
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
          onEndReachedThreshold={0.2}
        />
        <FloatingButton onPress={handlePress}>
          <ButtonSign> + </ButtonSign>
        </FloatingButton>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
