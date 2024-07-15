import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useField } from 'formik';

const NameInputField = () => {
  const [firstNameField, firstNameMeta] = useField('firstName');
  const [lastNameField, lastNameMeta] = useField('lastName');

  return (
    <View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          onChangeText={firstNameField.onChange('firstName')}
          onBlur={firstNameField.onBlur('firstName')}
          value={firstNameField.value}
          autoCapitalize="words"
          placeholder="Prénom"
        />
        {firstNameMeta.touched && firstNameMeta.error ? (
          <Text style={styles.errorText}>{firstNameMeta.error}</Text>
        ) : null}
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          onChangeText={lastNameField.onChange('lastName')}
          onBlur={lastNameField.onBlur('lastName')}
          value={lastNameField.value}
          autoCapitalize="words"
          placeholder="Nom"
        />
        {lastNameMeta.touched && lastNameMeta.error ? (
          <Text style={styles.errorText}>{lastNameMeta.error}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
  },
});

export default NameInputField;
