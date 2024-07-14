// src/screens/HomeScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DUMMY_DATA = [
  { id: '1', name: 'John Doe', time: '08:30' },
  { id: '2', name: 'Jane Smith', time: '09:00' },
  { id: '3', name: 'Bob Johnson', time: '09:15' },
];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.listItemInfo}>
        <Text style={styles.listItemName}>{item.name}</Text>
        <Text style={styles.listItemTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <View>
          <Text style={styles.companyName}>TransTrack</Text>
          <Text style={styles.byCompany}>by Transpay</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="more-vert" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search attendees"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Scan')}
        >
          <Icon name="qr-code-scanner" size={24} color="#007AFF" />
          <Text style={styles.actionButtonText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Add')}
        >
          <Icon name="person-add" size={24} color="#007AFF" />
          <Text style={styles.actionButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Recent Attendances</Text>
        <FlatList
          data={DUMMY_DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  companyName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  byCompany: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999',
    marginTop: 2,
  },
  iconButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    height: 44,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 12,
    marginTop: 5,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listItemInfo: {
    flex: 1,
  },
  listItemName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  listItemTime: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
});

export default HomeScreen;