import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Alert, View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '../Styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {loginUser} from '../redux/reducers';

const DrawerMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.loggedUser);
  const handleLogout = async () => {
    try {
      dispatch(loginUser(null));
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
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
};

export default DrawerMenu;
