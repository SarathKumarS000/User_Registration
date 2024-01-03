import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Image,
  DrawerLayoutAndroid,
  Modal,
  TextInput,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {updateUserName} from '../redux/actions';
import SizedBox from '../SizedBox';
import styles from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

interface FormData {
  email: string;
  newUsername: string;
}

interface User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
}

const Profile = ({navigation, route}) => {
  // State for the currently logged-in user
  const [username, setUsername] = useState(route.params?.foundUser);

  // React Hook Form setup for the form used in the modal
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      newUsername: '',
    },
  });

  const [usersData, setUsersData] = useState<User[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const dispatch = useDispatch();

  const drawerRef = useRef(null);

  const handleSidebarToggle = () => {
    if (drawerRef.current) {
      (drawerRef.current as DrawerLayoutAndroid).openDrawer();
    }
  };

  const handleLogout = async () => {
    try {
      // await AsyncStorage.removeItem('usersData');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const handleUpdateUserName = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleUpdateNameConfirm = () => {
    if (newName.length >= 4) {
      const isUserNameRegistered = usersData.some(
        (user: any) => user.userName === newName,
      );
      if (!isUserNameRegistered) {
        dispatch(updateUserName(newName));
        setUsername(prevUsername => ({
          ...prevUsername,
          userName: newName,
        }));
        const updatedUsersData = usersData.map((user: User) => {
          if (user.email === route.params.foundUser.email) {
            return {...user, userName: newName};
          }
          return user;
        });
        setUsersData(updatedUsersData);
        updateUserNameInAsyncStorage(newName);
        setNewName('');
        setModalVisible(false);
        Alert.alert('Success', 'Username updated successfully!');
      } else {
        form.setError('newUsername', {
          type: 'manual',
          message: 'Username is already registered.',
        });
      }
    } else {
      form.setError('newUsername', {
        type: 'manual',
        message: 'Username must be at least 4 characters long.',
      });
    }
  };

  const updateUserNameInAsyncStorage = async (newName: string) => {
    try {
      const userDataString = await AsyncStorage.getItem('usersData');

      if (userDataString) {
        const parsedData = JSON.parse(userDataString);

        // Map through the users and update the username for the logged-in user
        const updatedData = parsedData.map((user: {email: any}) => {
          if (user.email === route.params.foundUser.email) {
            return {...user, userName: newName};
          }
          return user;
        });
        await AsyncStorage.setItem('usersData', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error('Error updating user name in AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('usersData');
        console.log(userDataString, '123');

        if (userDataString) {
          const parsedData = JSON.parse(userDataString) as User[];
          setUsersData(parsedData);
        } else {
          Alert.alert('Error', 'No user data found');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <DrawerLayoutAndroid
              ref={drawerRef}
              drawerWidth={250}
              drawerBackgroundColor="transparent"
              drawerPosition="right"
              renderNavigationView={() => (
                <View>
                  <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.button}>
                      <Text style={styles.buttonTitle}>Logout</Text>
                    </View>
                  </TouchableOpacity>

                  <SizedBox height={13} />

                  <TouchableOpacity onPress={handleUpdateUserName}>
                    <View style={styles.button}>
                      <Text style={styles.buttonTitle}>Update Username</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleModalClose}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Enter New Username</Text>
                    <SizedBox height={5} />
                    <TextInput
                      style={styles.modalTextInput}
                      placeholder="Username"
                      value={newName}
                      onChangeText={text => {
                        setNewName(text);
                        form.setError('newUsername', {
                          type: 'manual',
                          message: '',
                        });
                      }}
                    />
                    {form.formState.errors?.newUsername && (
                      <Text style={styles.errorText}>
                        {form.formState.errors?.newUsername.message}
                      </Text>
                    )}
                    <SizedBox height={5} />
                    <View style={styles.modalButtonContainer}>
                      <TouchableOpacity onPress={handleModalClose}>
                        <View style={styles.modalButton}>
                          <Text style={styles.modalButtonText}>Cancel</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleUpdateNameConfirm}>
                        <View style={styles.modalButton}>
                          <Text style={styles.modalButtonText}>Update</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <TouchableOpacity onPress={handleSidebarToggle}>
                <View style={styles.hamburgerIconContainer}>
                  <Image
                    source={require('../assets/hamburger-icon.png')}
                    style={styles.hamburgerIcon}
                  />
                </View>
              </TouchableOpacity>
              <SizedBox height={70} />

              <Text style={styles.title}>
                Welcome,{' '}
                <Text style={{color: 'rgb(93, 95, 222)'}}>
                  {username?.firstName}
                </Text>
              </Text>
              <SizedBox height={13} />
              <View style={styles.form}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.textInput}>{username?.email}</Text>
              </View>
              <SizedBox height={8} />
              <View style={styles.form}>
                <Text style={styles.label}>Full Name:</Text>
                <Text style={styles.textInput}>
                  {username?.firstName + ' ' + username?.lastName}
                </Text>
              </View>
              <SizedBox height={8} />
              <View style={styles.form}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.textInput}>{username?.userName}</Text>
              </View>

              <SizedBox height={37} />
              <View style={styles.boxContainer}>
                <Text style={styles.boxHeading}>All Users List</Text>
                <View style={styles.listContainer}>
                  <FlatList
                    data={usersData}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('UserDetails', {
                            user: item,
                          });
                        }}>
                        <View style={styles.userRow}>
                          <Text style={styles.userName}>{item.userName}</Text>
                          <Text style={styles.userEmail}>{'>>>'}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.email}
                  />
                </View>
              </View>
            </DrawerLayoutAndroid>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Profile;
