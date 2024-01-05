import React, {useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import SizedBox from '../SizedBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

// Define the structure of the user object for form data
interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'Must be at least 2 characters'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  userName: yup
    .string()
    .required('User name is required')
    .min(4, 'Must be at least 2 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), ''], 'Password doesnot match'),
});

interface SignUpProps {
  navigation: any;
  route: any;
}

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<User>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  // Refs for focusing on the next TextInput
  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const userNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const storedData = await AsyncStorage.getItem('usersData');
      const users: any[] = storedData ? JSON.parse(storedData) : [];

      const isEmailRegistered = users.some(
        (user: any) => user.email === data.email,
      );
      const isUserNameRegistered = users.some(
        (user: any) => user.userName === data.userName,
      );
      if (isEmailRegistered) {
        Alert.alert('Error', 'Email is already registered');
        return;
      } else if (isUserNameRegistered) {
        Alert.alert('Error', 'Username is already registered');
        return;
      } else {
        const newUsers = [...users, data];
        await AsyncStorage.setItem('usersData', JSON.stringify(newUsers));
      }
      Alert.alert(
        'Data stored successfully',
        `Name: ${data.firstName + ' ' + data.lastName}\nEmail: ${
          data.email
        }\nUsername: ${data.userName}`,
      );
      reset();
    } catch (error) {
      console.error('Error storing data:', error);
    }
  });

  return (
    // Wrapping the entire view in TouchableWithoutFeedback to dismiss the keyboard when tapping outside of TextInputs
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <Text style={styles.title}>Create Account</Text>

            <SizedBox height={8} />

            <Text style={styles.subtitle}>Sign up to get started</Text>

            <SizedBox height={16} />
            <View style={styles.form}>
              <Text style={styles.label}>First Name</Text>
              <Controller
                control={control}
                name="firstName"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    keyboardType="default"
                    onBlur={onBlur}
                    onChangeText={text =>
                      onChange(text.charAt(0).toUpperCase() + text.slice(1))
                    }
                    onSubmitEditing={() => {
                      if (lastNameRef.current) {
                        lastNameRef.current.focus();
                      }
                    }}
                    style={styles.textInput}
                    textContentType="username"
                    value={value}
                  />
                )}
              />
            </View>
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}

            <SizedBox height={16} />

            <View style={styles.form}>
              <Text style={styles.label}>Last Name</Text>
              <Controller
                control={control}
                name="lastName"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={lastNameRef}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={text =>
                      onChange(text.charAt(0).toUpperCase() + text.slice(1))
                    }
                    onSubmitEditing={() => {
                      if (emailRef.current) {
                        emailRef.current.focus();
                      }
                    }}
                    style={styles.textInput}
                    textContentType="familyName"
                    value={value}
                  />
                )}
              />
            </View>
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}

            <SizedBox height={16} />

            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={emailRef}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                      if (userNameRef.current) {
                        userNameRef.current.focus();
                      }
                    }}
                    style={styles.textInput}
                    textContentType="emailAddress"
                    value={value}
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <SizedBox height={16} />

            <View style={styles.form}>
              <Text style={styles.label}>Username</Text>
              <Controller
                control={control}
                name="userName"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={userNameRef}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                      if (passwordRef.current) {
                        passwordRef.current.focus();
                      }
                    }}
                    style={styles.textInput}
                    textContentType="username"
                    value={value}
                  />
                )}
              />
            </View>
            {errors.userName && (
              <Text style={styles.errorText}>{errors.userName.message}</Text>
            )}

            <SizedBox height={16} />

            <View style={styles.form}>
              <Text style={styles.label}>Password</Text>
              <Controller
                control={control}
                name="password"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={passwordRef}
                    secureTextEntry
                    keyboardType="default"
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                      if (confirmPasswordRef.current) {
                        confirmPasswordRef.current.focus();
                      }
                    }}
                    style={styles.textInput}
                    textContentType="password"
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            <SizedBox height={16} />

            <View style={styles.form}>
              <Text style={styles.label}>Confirm Password</Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={confirmPasswordRef}
                    secureTextEntry
                    keyboardType="default"
                    onChangeText={onChange}
                    onSubmitEditing={onSubmit}
                    style={styles.textInput}
                    textContentType="password"
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}

            <SizedBox height={16} />

            <Pressable style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonTitle}>Register</Text>
            </Pressable>

            <SizedBox height={16} />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.textButton}>Back</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.textButton,
                      {textDecorationLine: 'underline'},
                    ]}>
                    Log In
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
