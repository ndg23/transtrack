import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const YetNavbarComponent = ({message}) => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor:"#fff"}}>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </BackButton>
        <HeaderText>{message}</HeaderText>
      </Header>
    </View>
  );
};

export default YetNavbarComponent;

const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 16px;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;

const Content = styled.View`
  padding: 24px 16px;
`;
