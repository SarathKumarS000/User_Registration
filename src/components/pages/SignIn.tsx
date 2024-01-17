import React, {useRef, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {loginUser} from '../redux/reducers';

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

  const dispatch = useDispatch();
  const userList = useSelector((state: RootState) => state.user.userList);

  const onSubmit = () => {
    const {email, password} = form.getValues();

    const foundUser = userList.find(
      user =>
        (user.email.toLowerCase() === email.toLowerCase() ||
          user.userName.toLowerCase() === email.toLowerCase()) &&
        user.password === password,
    );

    if (foundUser) {
      dispatch(loginUser(foundUser));
      navigation.navigate('Profile', {foundUser});
    } else {
      Alert.alert('Error', 'Invalid Credentials');
    }
  };

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
