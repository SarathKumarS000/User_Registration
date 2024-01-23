import React from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
import styles from '../Styles';

interface CommonInputProps {
  control: any;
  name: string;
  title?: string;
  subtitle?: string;
  label: string;
  testID: string;
  inputRef?: React.RefObject<TextInput | null>;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  secureTextEntry?: boolean;
  error?: string;
  togglePasswordVisibility?: any;
  showPassword?: any;
  rules?: any;
}

const CommonInput: React.FC<CommonInputProps> = ({
  control,
  name,
  label,
  testID,
  inputRef,
  onBlur,
  onSubmitEditing,
  secureTextEntry,
  error,
  togglePasswordVisibility,
  showPassword,
  rules,
}) => {
  return (
    <View style={{marginBottom: 16}}>
      <View style={styles.form}>
        <Text style={styles.label}>{label}</Text>
        <Controller
          control={control}
          name={name}
          render={({field}) => (
            <TextInput
              ref={inputRef as React.RefObject<TextInput>}
              testID={testID}
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={field.onChange}
              value={field.value}
              secureTextEntry={secureTextEntry}
              style={styles.textInput}
              onSubmitEditing={onSubmitEditing}
            />
          )}
          rules={rules}
        />

        {togglePasswordVisibility ? (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={{color: '#FFFFFF', marginLeft: 10}}>
              {showPassword ? '🔒' : '👁️'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CommonInput;
