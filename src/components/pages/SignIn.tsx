import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import SizedBox from '../SizedBox';
import styles from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
  email: string;
  password: string;
}

interface SignInProps {
  navigation: any;
}

const SignIn: React.FC<SignInProps> = ({navigation}) => {
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const passwordRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async () => {
    try {
      const userData: string | null = await AsyncStorage.getItem('usersData');

      if (userData) {
        const parsedData = JSON.parse(userData);
        const foundUser = parsedData.find(
          (user: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            userName: string;
          }) =>
            (user.email === form.getValues('email') ||
              user.userName === form.getValues('email')) &&
            user.password === form.getValues('password'),
        );

        if (foundUser) {
          navigation.navigate('Profile', {foundUser});
        } else {
          Alert.alert('Error', 'Invalid Credentials');
        }
      } else {
        Alert.alert('Error', 'No user data found');
      }
    } catch (error) {
      // console.error('Error during sign-in:', error);
      Alert.alert('Error', 'Sign-in failed. Please try again.');
    }
  };

  // useEffect(() => {
  //   AsyncStorage.getItem('usersData')
  //     .then(userDataString => {
  //       if (userDataString) {
  //         const userData = JSON.parse(userDataString);
  //         form.setValue('email', userData[userData.length - 1].email);
  //         // form.setValue('password', userData[userData.length - 1].password);
  //         console.log(userDataString);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error retrieving data:', error);
  //     });
  // }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <Text style={styles.title}>Welcome !</Text>

            <SizedBox height={8} />

            <Text style={styles.subtitle}>Sign in to your account</Text>

            <SizedBox height={32} />

            <View style={styles.form}>
              <Text style={styles.label}>Email / Username</Text>
              <Controller
                control={form.control}
                name="email"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    testID="email"
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
                    textContentType="familyName"
                    value={value}
                  />
                )}
              />
            </View>

            <SizedBox height={16} />

            <View style={styles.form}>
              <Text style={styles.label}>Password</Text>

              <Controller
                control={form.control}
                name="password"
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    ref={passwordRef}
                    testID="password"
                    secureTextEntry={!showPassword}
                    keyboardType="default"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onSubmitEditing={onSubmit}
                    style={styles.textInput}
                    textContentType="password"
                    value={value}
                  />
                )}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={{color: '#FFFFFF', marginLeft: 10}}>
                  {showPassword ? '🔒' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>

            <SizedBox height={16} />

            <TouchableOpacity onPress={onSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Log In</Text>
              </View>
            </TouchableOpacity>

            <SizedBox height={16} />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.textButton}>Back</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.textButton,
                      {textDecorationLine: 'underline'},
                    ]}>
                    Sign Up
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

export default SignIn;
