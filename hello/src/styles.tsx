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

export const StyledTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  color: black;
`;

export const StyledContainer = styled.View`
  margin-top: 32px;
  padding-horizontal: 24px;
`;

export const StyledDescription = styled.Text`
  margin-top: 8px;
  font-size: 18px;
  font-weight: 400;
`;

export const StyledInput = styled.TextInput`
  margin: 12px;
  border-width: 1px;
`;

export const StyledText = styled.Text`
  color: gray;
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 12px;
`;

export const StyledButton = styled.Button`
  font-size: 16px;
  font-weight: normal;
  height: 44px;
`;

export const StyledDetailsName = styled.Text`
  font-size: 25px;
  font-weight: bold;
  align-self: center;
  padding: 15px;
`;

export const StyledDetails = styled.Text`
  font-size: 14px;
  font-weight: normal;
`;

export const StyledName = styled.Text`
  padding: 5px;
  font-weight: bold;
`;

export const StyledEmail = styled.Text`
  align-items: flex-end;
  left: 5px;
`;

export const StyledItem = styled.View`
  background-color: lightblue;
  padding: 20px;
  margin-vertical: 8px;
  margin-horizontal: 16px;
`;

export const StyledPicker = styled.Picker`
  height: 40px;
  margin: 12px;
  border-width: 1px;
  padding: 10px;
`;

export const StyledLoadingIndicator = styled.View`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 350px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
`;
