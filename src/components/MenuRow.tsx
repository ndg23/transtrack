import React from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const MenuRow = ({onChangeCard}) => {
 const navigation=useNavigation()
    return (
    <Container>
      <MenuItem>
        <Button onPress={()=>navigation.navigate("History")}>
          <Icon name="history" size={26} />
          <ButtonText>Historique</ButtonText>
        </Button>
      </MenuItem>
      <MenuItem>
        <Button onPress={()=>onChangeCard()}>
          <Switch name="select-arrows" size={26} />
          <ButtonText>Changer de carte</ButtonText>
        </Button>
      </MenuItem>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
`;

const MenuItem = styled.View`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(MaterialIcons)`
  color: #2a2a2a;
  margin-right: 5px;
`;
const Switch = styled(Entypo)`
  color: #2a2a2a;
  margin-right: 5px;
`;
const ButtonText = styled.Text`
  color: #2a2a2a;
  font-size: 16px;
  font-family: 'Inter-Medium';

/* font-weight: bold; */
`;

export default MenuRow;
