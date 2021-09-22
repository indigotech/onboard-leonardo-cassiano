import { StyledInput, StyledText } from '../styles';
import React, { ComponentState } from 'react';

export const InputSection: React.FC<{ label: string; input: string; onChange: ComponentState }> = ({
  label,
  input,
  onChange,
}) => {
  return (
    <>
      <StyledText>{label}</StyledText>
      <StyledInput onChangeText={onChange} value={input} />
    </>
  );
};
