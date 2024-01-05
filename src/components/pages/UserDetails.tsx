import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import styles from '../Styles';
import SizedBox from '../SizedBox';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserName} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserDetailsProps {
  route: any;
  navigation: any;
}

const UserDetails: React.FC<UserDetailsProps> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) =>
    state.user.userList.find((u: User) => u.email === route.params.user.email),
  );
  const userList = useSelector((state: any) => state.user.userList);

  const [newName, setNewName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const form = useForm({
    defaultValues: {
      newUsername: '',
    },
  });

  const handleUpdateNameConfirm = () => {
    if (newName.length >= 4) {
      const isUserNameRegistered = userList.some(
        (u: User) => u.userName === newName,
      );
      if (!isUserNameRegistered) {
        dispatch(updateUserName(route.params.user.email, newName));
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
        const updatedData = parsedData.map((userData: User) => {
          if (userData.email === route.params.user.email) {
            return {...userData, userName: newName};
          }
          return userData;
        });

        await AsyncStorage.setItem('usersData', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error('Error updating user name in AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.hamburgerIconContainer}>
          <Image
            source={require('../assets/back-icon.png')}
            style={styles.hamburgerIcon}
          />
        </View>
      </TouchableOpacity>

      <SizedBox height={70} />
      <View style={styles.userDetailsContainer}>
        <Text style={styles.userTitle}>User Details</Text>
        <View style={styles.separator} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>
            {user?.firstName + ' ' + user?.lastName}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{user?.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Username:</Text>
          <Text style={styles.detailValue}>{user?.userName}</Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>Update Username</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
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
              <TouchableOpacity onPress={() => setModalVisible(false)}>
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
    </View>
  );
};

export default UserDetails;
