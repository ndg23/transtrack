import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

const CardListScreen = ({ route, navigation }) => {
  const { handleCardChange } = route.params;
  const cards = [
    { id: 1, cardNumber: '1234-5678-9012-3456', points: 500, holderName: 'John Doe', expiration: '12/24' },
    { id: 2, cardNumber: '2345-6789-0123-4567', points: 300, holderName: 'Jane Doe', expiration: '08/23' },
  ];

  return (
    <Container>
      <SectionTitle>Vos Cartes de Fidélité</SectionTitle>
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <CardListItem onPress={() => {
            handleCardChange(item);
            navigation.goBack();
          }}>
            <CardListItemHeader>
              <CardListItemTitle>{item.holderName}</CardListItemTitle>
              <CardPoints>{item.points} points</CardPoints>
            </CardListItemHeader>
            <CardDetails>
              <CardInfo>
                <InfoLabel>Numéro:</InfoLabel>
                <InfoValue>{item.cardNumber}</InfoValue>
              </CardInfo>
              <CardInfo>
                <InfoLabel>Expiration:</InfoLabel>
                <InfoValue>{item.expiration}</InfoValue>
              </CardInfo>
            </CardDetails>
          </CardListItem>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #1e1e1e;
  padding: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

const CardListItem = styled.TouchableOpacity`
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardListItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CardListItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

const CardPoints = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const CardDetails = styled.View``;

const CardInfo = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const InfoLabel = styled.Text`
  font-size: 14px;
  color: #aaa;
  font-weight: bold;
`;

const InfoValue = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-left: 5px;
`;

export default CardListScreen;
