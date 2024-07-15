import React from 'react';
import { TextInput, Text, View } from 'react-native';
import styled from 'styled-components/native';

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  errorMessage?: string;
}

const InputContainer = styled(View)`
  margin-bottom: 20px;
`;

const InputField = styled(TextInput)<{ hasError: boolean }>`
  padding: 16px;
  border-radius: 8px;
  background-color: #efefef;
  border: ${(props) => (props.hasError ? '2px solid #DE1A1A' : '2px solid transparent')};
`;

const ErrorText = styled(Text)`
  color: #DE1A1A;
  margin-top: 8px;
  font-size: 14px;
`;

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, value, onChangeText, secureTextEntry = false, errorMessage }) => {
  return (
    <InputContainer>
      <InputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        hasError={!!errorMessage}
      />
      {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
    </InputContainer>
  );
};

export default CustomInput;
