import React, {useRef, useState} from 'react';
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
import styles from '../Styles';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserList} from '../redux/reducers';
import {RootState} from '../redux/rootReducer';

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
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      'Invalid email format',
    ),
  userName: yup
    .string()
    .required('Username is required')
    .min(4, 'Must be at least 4 characters'),
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

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const userNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.userList);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const isEmailRegistered = users.some(
        (user: any) => user.email === data.email,
      );
      const isUserNameRegistered = users.some(
        (user: any) => user.userName === data.userName,
      );
      if (isEmailRegistered || isUserNameRegistered) {
        Alert.alert('Error', 'Email/Username is already registered');
        return;
      } else {
        dispatch(updateUserList([...users, data]));
      }
      Alert.alert(
        'Data stored successfully',
        `Name: ${data.firstName + ' ' + data.lastName}\nEmail: ${
          data.email
        }\nUsername: ${data.userName}`,
        [
          {
            text: 'Stay Here',
            onPress: () => {
              reset();
            },
          },
          {
            text: 'Go to Login',
            onPress: () => {
              reset();
              navigation.navigate('SignIn');
            },
          },
        ],
      );
      reset();
    } catch (error) {
      console.error('Error storing data:', error);
    }
  });

  return (
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
                    testID="firstName"
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
                    testID="lastName"
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
                    testID="email"
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
                    testID="userName"
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
                    testID="password"
                    secureTextEntry={!showPassword}
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
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={{color: '#FFFFFF', marginLeft: 10}}>
                  {showPassword ? '🔒' : '👁️'}
                </Text>
              </TouchableOpacity>
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
                    testID="confirmPassword"
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
