import React, {useRef, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';

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
      navigation.navigate('Home');

      //Remove all data
      // await AsyncStorage.removeItem('usersData');

      //Remove a single user
      // const existingData = await AsyncStorage.getItem('usersData');
      // if (existingData) {
      //   const parsedData = JSON.parse(existingData);
      //   const updatedData = parsedData.filter(
      //     (user: {email: string}) => user.email !== '#EMAIL',
      //   );
      //   await AsyncStorage.setItem('usersData', JSON.stringify(updatedData));
      // }
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
        (user: any) => user.userName.toLowerCase() === newName.toLowerCase(),
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

        const updatedData = parsedData.map((user: User) => {
          if (user.email === route.params.foundUser.email) {
            return {...user, userName: newName} as User;
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
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../assets/user.png')}
          style={styles.drawerIcon}
        />
        <Text style={styles.drawerHeaderText}>
          {user?.firstName + ' ' + user?.lastName}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={handleUpdateUserName}
        activeOpacity={0.7}>
        <Image
          source={require('../assets/settings-icon.png')}
          style={styles.drawerIcon}
        />
        <Text style={styles.drawerItemText}>Update Username</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={handleLogout}
        activeOpacity={0.7}>
        <Image
          source={require('../assets/logout-icon.png')}
          style={styles.drawerIcon}
        />
        <Text style={styles.drawerItemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
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
    }, [dispatch]),
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={navigationView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.content}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleModalClose}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Change Username</Text>
                    <TextInput
                      style={styles.modalTextInput}
                      placeholder="Enter new username"
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

                    <View style={styles.modalButtonContainer}>
                      <TouchableOpacity
                        style={styles.modalCancelButton}
                        onPress={handleModalClose}>
                        <Text style={styles.modalCancelButtonText}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.modalUpdateButton}
                        onPress={handleUpdateNameConfirm}>
                        <Text style={styles.modalUpdateButtonText}>Update</Text>
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
                    data={userList}
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
            </KeyboardAvoidingView>
          </DrawerLayoutAndroid>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Profile;
