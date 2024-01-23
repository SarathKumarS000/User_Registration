import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useForm} from 'react-hook-form';
import styles from '../../Styles';
import {useDispatch} from 'react-redux';
import {updateUserName} from '../../redux/actions';
import ChangeUsernameModal from '../../modal/ChangeUsernameModal';
import {useUserByEmail, useUserList} from '../../common/Selectors';
import {User, FormData, RouteProps} from '../../common/Interface';

const UserDetails: React.FC<RouteProps> = ({route}) => {
  const dispatch = useDispatch();
  const user = useUserByEmail(route.params.user);
  const userList = useUserList();
  const [newName, setNewName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const form = useForm<FormData>();

  const handleUpdateNameConfirm = () => {
    if (newName.length >= 4) {
      const isUserNameRegistered = userList.some(
        (u: User) => u.userName.toLowerCase() === newName.toLowerCase(),
      );
      if (!isUserNameRegistered) {
        dispatch(updateUserName(user.email, newName));
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
        {renderUserDetail('Name:', user?.firstName + ' ' + user?.lastName)}
        {renderUserDetail('Email:', user?.email)}
        {renderUserDetail('Username:', user?.userName)}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update Username</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ChangeUsernameModal
        newName={newName}
        handleUpdateNameConfirm={handleUpdateNameConfirm}
        setNewName={setNewName}
        formError={form.formState.errors?.newUsername?.message}
        isModalVisible={isModalVisible}
        setModalVisible={() => setModalVisible(false)}
      />
    </View>
  );
};

export default UserDetails;

const renderUserDetail = (label: string, value: string) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);
