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
  autoCapitalize: any;
  inputRef?: React.RefObject<TextInput | null>;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  textContentType: any;
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
  autoCapitalize,
  onBlur,
  onSubmitEditing,
  secureTextEntry,
  keyboardType,
  textContentType,
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
              autoCapitalize={autoCapitalize}
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={field.onChange}
              value={field.value}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              style={styles.textInput}
              textContentType={textContentType}
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
