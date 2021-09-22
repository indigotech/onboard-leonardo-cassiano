import { StyledInput, StyledText, StyledErrorText, StyledErrorInput } from '../styles';
import React, { ComponentState } from 'react';

export const InputSection: React.FC<{ label: string; input: string; onChange: ComponentState; onError: boolean }> = ({
  label,
  input,
  onChange,
  onError,
}) => {
  return (
    <>
      {onError ? (
        <>
          <StyledText>{label}</StyledText>
          <StyledErrorInput onChangeText={onChange} value={input} />
          <StyledErrorText color='red'>{label} está incorreto</StyledErrorText>
        </>
      ) : (
        <>
          <StyledText>{label}</StyledText>
          <StyledInput onChangeText={onChange} value={input} />
        </>
      )}
    </>
  );
};
