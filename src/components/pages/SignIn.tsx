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
import {useForm} from 'react-hook-form';
import styles from '../Styles';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/reducers';
import Input from '../common/Input';
import {FormData, RouteProps, User} from '../common/Interface';
import {useUserList} from '../common/Selectors';

const SignIn: React.FC<RouteProps> = ({navigation}) => {
  const form = useForm<FormData>();
  const passwordRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const userList = useUserList();

  const onSubmit = () => {
    const {email, password} = form.getValues();

    const foundUser = userList.find(
      (user: User) =>
        (user.email.toLowerCase() === email?.toLowerCase() ||
          user.userName.toLowerCase() === email?.toLowerCase()) &&
        user.password === password,
    );

    if (foundUser) {
      dispatch(loginUser(foundUser));
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
            <Text style={styles.subtitle}>Sign in to your account</Text>

            <Input
              control={form.control}
              name="email"
              label="Email / Username"
              testID="email"
              onSubmitEditing={() => {
                if (passwordRef.current) {
                  passwordRef.current.focus();
                }
              }}
            />

            <Input
              control={form.control}
              name="password"
              label="Password"
              testID="password"
              inputRef={passwordRef}
              secureTextEntry={!showPassword}
              onSubmitEditing={onSubmit}
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />

            <TouchableOpacity onPress={onSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Log In</Text>
              </View>
            </TouchableOpacity>

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
