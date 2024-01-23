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
import {useForm} from 'react-hook-form';
import styles from '../Styles';
import {useDispatch} from 'react-redux';
import {updateUserList} from '../redux/reducers';
import Input from '../common/Input';
import {User, RouteProps} from '../common/Interface';
import {useUserList} from '../common/Selectors';

const SignUp: React.FC<RouteProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<User>();

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const userNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const users = useUserList();

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

            <Text style={styles.subtitle}>Sign up to get started</Text>

            <Input
              control={control}
              name="firstName"
              label="First Name"
              testID="firstName"
              secureTextEntry={false}
              onSubmitEditing={() => {
                if (lastNameRef.current) {
                  lastNameRef.current.focus();
                }
              }}
              error={errors.firstName?.message}
              rules={{
                required: 'First name is required',
                minLength: {value: 2, message: 'Must be at least 2 characters'},
              }}
            />

            <Input
              control={control}
              name="lastName"
              label="Last Name"
              testID="lastName"
              inputRef={lastNameRef}
              onSubmitEditing={() => {
                if (emailRef.current) {
                  emailRef.current.focus();
                }
              }}
              error={errors.lastName?.message}
              rules={{
                required: 'Last name is required',
              }}
            />

            <Input
              control={control}
              name="email"
              label="Email"
              testID="email"
              inputRef={emailRef}
              onSubmitEditing={() => {
                if (userNameRef.current) {
                  userNameRef.current.focus();
                }
              }}
              error={errors.email?.message}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Invalid email format',
                },
              }}
            />

            <Input
              control={control}
              name="userName"
              label="Username"
              testID="userName"
              inputRef={userNameRef}
              onSubmitEditing={() => {
                if (passwordRef.current) {
                  passwordRef.current.focus();
                }
              }}
              error={errors.userName?.message}
              rules={{
                required: 'Username is required',
                minLength: {value: 4, message: 'Must be at least 4 characters'},
              }}
            />

            <Input
              control={control}
              name="password"
              label="Password"
              testID="password"
              inputRef={passwordRef}
              secureTextEntry={!showPassword}
              onSubmitEditing={() => {
                if (confirmPasswordRef.current) {
                  confirmPasswordRef.current.focus();
                }
              }}
              error={errors.password?.message}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
              rules={{
                required: 'Password is required',
                minLength: {value: 8, message: 'Must be at least 8 characters'},
              }}
            />

            <Input
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              testID="confirmPassword"
              inputRef={confirmPasswordRef}
              secureTextEntry
              onSubmitEditing={onSubmit}
              error={errors.confirmPassword?.message}
              rules={{
                required: 'Confirm password is required',
                validate: (value: any, {password}: any) =>
                  value === password || 'Passwords do not match',
              }}
            />

            <Pressable style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonTitle}>Register</Text>
            </Pressable>

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
