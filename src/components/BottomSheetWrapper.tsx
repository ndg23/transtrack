import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardItem = ({ card, onSelect, onRemove }) => {
  return (
    <TouchableOpacity 
      style={styles.cardItem} 
      onPress={() => onSelect(card)}
      accessible={true} 
      accessibilityLabel={`Carte ${card?.shop?.name}, ${card.points} points`}
    >
      <View style={styles.cardContent}>
      {card.shop.logoUrl ? (
            <Image 
              source={{ uri: card.shop.logoUrl }} 
              style={styles.shopLogo} 
              resizeMode="contain"
            />
          ) : (
            <View style={styles.shopLogoPlaceholder}>
              <MaterialIcons name="store" size={24} color="#FFFFFF" />
            </View>
          )}
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{card?.shop?.name}</Text>
          <Text style={styles.cardNumber}>{card.cardNumber}</Text>
          <View style={styles.pointsContainer}>
            <MaterialIcons name="star" size={16} color="#FFC107" />
            <Text style={styles.cardPoints}>{card.points} points</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        onPress={() => onRemove(card.id)} 
        style={styles.removeButton}
        accessible={true} 
        accessibilityLabel={`Supprimer la carte ${card?.shop?.name}`}
      >
        <MaterialIcons name="delete-outline" size={24} color="#757575" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const BottomSheetContent = ({ userCards, onClose, onSelect, onRemove }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes cartes de fidélité</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose} accessible={true} accessibilityLabel="Fermer">
          <MaterialIcons name="close" size={24} color="#5f6368" />
        </TouchableOpacity>
      </View>
      <BottomSheetFlatList
        data={userCards}
        renderItem={({ item }) => <CardItem card={item} onSelect={onSelect} onRemove={onRemove} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />
      {/* <TouchableOpacity style={styles.addCardButton} accessible={true} accessibilityLabel="Ajouter une nouvelle carte">
        <MaterialIcons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.addCardText}>Ajouter une carte</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const BottomSheetWrapper = ({ bottomSheetRef, userCards, onSelect, onRemove }) => {
  const handleClosePress = () => bottomSheetRef.current?.close();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={["60%", "85%"]}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetContent 
        userCards={userCards}
        onClose={handleClosePress}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  bottomSheetBackground: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  indicator: {
    backgroundColor: '#BDBDBD',
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#202124',
  },
  closeButton: {
    padding: 8,
  },
  cardList: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    color: '#202124',
    fontWeight: '500',
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPoints: {
    fontSize: 14,
    color: '#1a73e8',
    fontWeight: '500',
    marginLeft: 4,
  },
  removeButton: {
    padding: 8,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#1a73e8',
    borderRadius: 28,
  },
  shopLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  shopLogoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(244, 36, 36, 0.995)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addCardText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default BottomSheetWrapper;