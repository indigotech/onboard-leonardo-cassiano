import { createConfigItem } from '@babel/core';
import React from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native';

const DATA = [
  {
    username: 'tester1',
    useremail: 'tester1@taqtile.com.br',
    id: '1',
  },
  {
    username: 'tester2',
    useremail: 'tester2@taqtile.com.br',
    id: '2',
  },
  {
    username: 'tester3',
    useremail: 'tester3@taqtile.com.br',
    id: '3',
  },
];

const Item: React.FC<{
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

const Settings = () => {
  const renderItem = ({item}) => <Item name= {item.username} email={item.useremail}/>;

  return (
    <SafeAreaView>
      <View>
        <FlatList data={DATA} keyExtractor={(item) => item.id} renderItem={renderItem} />
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
