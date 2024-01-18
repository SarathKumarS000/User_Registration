import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from '../Styles';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <Text style={styles.title}>Welcome Home!</Text>

          <Text style={styles.subtitle}>Explore the app's features here!</Text>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Sign In</Text>
            </View>
          </TouchableOpacity>
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
