import React from 'react';
import styled from 'styled-components/native';

interface ListHeaderComponentProps {
  title: string;
  error?: string | null;
}

const ListHeaderComponent: React.FC<ListHeaderComponentProps> = ({ title, error }) => {
  return (
    <Container>
      <HeaderText>{title}</HeaderText>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default ListHeaderComponent;

const Container = styled.View`
  padding: 20px;
  background-color: #fdecec;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #d50101;
`;

const ErrorText = styled.Text`
  margin-top: 10px;
  color: #ff0000;
  font-size: 16px;
`;
