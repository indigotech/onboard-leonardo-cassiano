import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const FloatingButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #c0c0c0;
  position: absolute;
  bottom: 40px;
  right: 15px;
  opacity: 1;
`;

export const ButtonSign = styled.Text`
  align-self: center;
  color: #ffffff;
  font-size: 40px;
`;

export const styles = StyleSheet.create({
  item: {
    backgroundColor: '#A7AED3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  buttonStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  button: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 350,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
