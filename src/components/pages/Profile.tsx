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
import styles from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import SizedBox from '../SizedBox';
import {updateUserList} from '../redux/reducers';

interface FormData {
  email: string;
  newUsername: string;
}

interface User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ProfileProps {
  navigation: any;
  route: any;
}

const Profile: React.FC<ProfileProps> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState<User[]>([]);
  const user = usersData.find(
    (u: User) => u.email === route.params.foundUser.email,
  );

  const userList = useSelector((state: any) => state.user.userList);

  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      newUsername: '',
    },
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
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
      const isUserNameRegistered = userList.some(
        (user: any) => user.userName === newName,
      );
      if (!isUserNameRegistered) {
        dispatch(updateUserName(route.params.foundUser.email, newName));
        const updatedUsersData = userList.map((user: User) => {
          if (user.email === route.params.foundUser.email) {
            return {...user, userName: newName};
          }
          return user;
        });
        updateUserNameInAsyncStorage(newName);
        setUsersData(updatedUsersData);
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
        const parsedData = JSON.parse(userDataString) as User[];

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

  const navigationView = () => (
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
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('usersData');

        if (userDataString) {
          const parsedData = JSON.parse(userDataString) as User[];
          setUsersData(parsedData);
          dispatch(updateUserList(parsedData));
        } else {
          Alert.alert('Error', 'No user data found');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

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
              drawerPosition="left"
              renderNavigationView={navigationView}>
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
                      onSubmitEditing={handleUpdateNameConfirm}
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
                  {user?.firstName}
                </Text>
              </Text>
              <SizedBox height={13} />

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
