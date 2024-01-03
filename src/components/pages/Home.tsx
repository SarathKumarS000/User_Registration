import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import SizedBox from '../SizedBox';
import styles from '../Styles';

const Home = ({navigation}) => {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <Text style={styles.title}>Welcome Home!</Text>

          <SizedBox height={8} />

          <Text style={styles.subtitle}>Explore the app's features here!</Text>

          <SizedBox height={16} />

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <SizedBox height={16} />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
