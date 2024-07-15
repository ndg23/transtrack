import React from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import ButtonComponent from './button';

const EmptyStateComponent = ({ icon, title, description,titleButton,onPressIn }) => {
  return (
    <Container>
      <IconContainer>
        <MaterialIcons name={icon} size={80} color="#DE1A1A" />
      </IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {/* <ButtonComponent title={titleButton} onPress={onPressIn} style={undefined} /> */}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

const IconContainer = styled.View`
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  /* font-weight: bold; */
  color: #333;
  margin-bottom: 10px;
  font-family: "Alexandria-Medium";
  text-align: center;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #222;
  font-family: "Alexandria-Regular";

  margin-bottom: 30px;

  text-align: center;
`;

export default EmptyStateComponent;
