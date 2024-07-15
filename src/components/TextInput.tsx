import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';

const createStyles = (theme: { dark?: boolean; colors: any; fontSize?: any; spacing?: any; borderRadius?: any; }) => {
  const { colors, fontSize, spacing, borderRadius } = theme;
  return StyleSheet.create({
    textViewError: {
      borderWidth: 1,
      borderColor: colors.dangerColorDark,
      borderRadius: borderRadius.micro,
      marginTop: spacing.smaller,
    },
    label: {
      paddingBottom: 6,
    },
    errorLabel: {
      textAlign: 'left',
      paddingTop: spacing.tiny,
      paddingBottom: spacing.tiny,
    },
    inputStyle: {
      fontSize: fontSize.md,
      color: colors.textDark,
      paddingVertical: spacing.smaller,
      paddingHorizontal: spacing.small,
      borderWidth: 1,
      borderRadius: borderRadius.micro,
      borderColor: colors.borderLight,
      height: spacing.larger,
    },
    errorInputStyle: {
      fontSize: fontSize.md,
      color: colors.textDark,
      paddingVertical: spacing.smaller,
      paddingHorizontal: spacing.small,
      borderWidth: 1,
      borderRadius: borderRadius.micro,
      borderColor: colors.dangerColorDark,
      height: spacing.larger,
    },
  });
};

const TextInputField = ({ onChangeText, error, keyboardType, secureTextEntry, label, value }) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { colors } = theme;

  return (
    <View>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={error ? styles.errorInputStyle : styles.inputStyle}
        accessibilityLabel={label}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
      />
      {error && (
        <Text style={styles.errorLabel}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

TextInputField.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  error: PropTypes.object,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextInputField;
