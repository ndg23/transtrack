// HistoryScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface User {
  id: string;
  name: string;
  lastSeen: Date;
  status: 'online' | 'offline' | 'away';
  avatar: string;
}

const HistoryScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'online' | 'offline' | 'away' | 'all'>('all');

  useEffect(() => {
    // Fetch users from API (placeholder)
    setUsers([
      { id: '1', name: 'Alice Johnson', lastSeen: new Date(), status: 'online', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Bob Smith', lastSeen: new Date(Date.now() - 3600000), status: 'away', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: '3', name: 'Charlie Brown', lastSeen: new Date(Date.now() - 86400000), status: 'offline', avatar: 'https://i.pravatar.cc/150?img=3' },
    ]);
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === 'all' || user.status === statusFilter)
    );
    setFilteredUsers(filtered);
  }, [users, searchQuery, statusFilter]);

  const renderUser = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.userItem}>
      <View style={styles.avatarContainer}>
        <Icon name="account-circle" size={50} color="#bdbdbd" />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userStatus}>{item.status}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#bdbdbd" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#bdbdbd" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.filterButtons}>
        {['all', 'online', 'offline', 'away'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              statusFilter === status && styles.activeFilter
            ]}
            onPress={() => setStatusFilter(status as any)}
          >
            <Text style={[styles.filterButtonText, statusFilter === status && styles.activeFilterText]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginLeft: 12,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
  },
  filterButtonText: {
    color: '#757575',
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: 'white',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 14,
    color: '#757575',
  },
});

export default HistoryScreen;