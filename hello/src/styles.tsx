import styled from 'styled-components/native';

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
