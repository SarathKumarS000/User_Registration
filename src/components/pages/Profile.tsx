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
} from 'react-native';
import {useForm} from 'react-hook-form';
import {updateUserName} from '../redux/actions';
import styles from '../Styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserList} from '../redux/reducers';
import ChangeUsernameModal from '../modal/ChangeUsernameModal';
import {User} from '../common/User';

interface FormData {
  email: string;
  newUsername: string;
}

interface ProfileProps {
  navigation: any;
  route: any;
}

const Profile: React.FC<ProfileProps> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState<User[]>([]);
  const user = route.params?.foundUser
    ? usersData.find((u: User) => u.email === route.params.foundUser.email)
    : null;

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
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
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

  const fetchUserData = async () => {
    try {
      if (userList) {
        setUsersData(userList);
        dispatch(updateUserList(userList));
      } else {
        Alert.alert('Error', 'No user data found');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
        onPress={() => {
          setModalVisible(true);
        }}
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
                onRequestClose={() => {
                  setModalVisible(false);
                }}>
                <ChangeUsernameModal
                  newName={newName}
                  handleUpdateNameConfirm={handleUpdateNameConfirm}
                  setNewName={setNewName}
                  formError={form.formState.errors?.newUsername?.message}
                  handleModalClose={() => {
                    setModalVisible(false);
                  }}
                />
              </Modal>

              <TouchableOpacity onPress={handleSidebarToggle}>
                <View style={styles.hamburgerIconContainer}>
                  <Image
                    source={require('../assets/hamburger-icon.png')}
                    style={styles.hamburgerIcon}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.title}>
                Welcome,{' '}
                <Text style={{color: 'rgb(93, 95, 222)'}}>
                  {user?.firstName}
                </Text>
              </Text>

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
