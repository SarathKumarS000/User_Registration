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
import {useDispatch, useSelector} from 'react-redux';
import {updateUserName} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateUserList} from '../redux/reducers';

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
        (u: User) => u.userName.toLowerCase() === newName.toLowerCase(),
      );
      if (!isUserNameRegistered) {
        dispatch(updateUserName(route.params.user.email, newName));
        updateUserNameInAsyncStorage(newName);
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
        const parsedData = JSON.parse(userDataString);
        const updatedData = parsedData.map((userData: User) => {
          if (userData.email === route.params.user.email) {
            return {...userData, userName: newName};
          }
          return userData;
        });

        await AsyncStorage.setItem('usersData', JSON.stringify(updatedData));
        dispatch(updateUserList(updatedData));
      }
    } catch (error) {
      console.error('Error updating user name in AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <View style={styles.backButtonContainer}>
          <Image
            source={require('../assets/back-icon.png')}
            style={styles.backButtonIcon}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </View>
      </TouchableOpacity> */}

      <View style={styles.fullUserDetailsContainer}>
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
          <View style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update Username</Text>
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
                onPress={() => setModalVisible(false)}>
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
    </View>
  );
};

export default UserDetails;
