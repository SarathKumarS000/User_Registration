import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {useForm} from 'react-hook-form';
import styles from '../Styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserName} from '../redux/actions';
import ChangeUsernameModal from '../modal/ChangeUsernameModal';

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

  return (
    <View style={styles.container}>
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
        <ChangeUsernameModal
          newName={newName}
          handleUpdateNameConfirm={handleUpdateNameConfirm}
          setNewName={setNewName}
          formError={form.formState.errors?.newUsername?.message}
          handleModalClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default UserDetails;
