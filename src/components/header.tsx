import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HeaderComponent = ({back = false, title, onAdd, add = false}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {back && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {add && (
        <TouchableOpacity style={styles.btnAdd} onPress={onAdd}>
          <MaterialIcons name="add" size={34} color={'#000'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // padding: 10,
    // height:50,
    paddingLeft:16,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  backButton: {
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 34,
    color: '#000',
    // fontWeight: '800',
    fontFamily: "Poppins-Bold"

  },
  btnAdd: {
    borderRadius: 50,
    padding: 5,
    // backgroundColor: '#E0E0E0',
  },
});
