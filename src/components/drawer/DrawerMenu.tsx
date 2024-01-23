import {Alert, View, Image, Text, TouchableOpacity} from 'react-native';
import styles from '../Styles';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/reducers';
import {useIsLoggedIn} from '../common/Selectors';

const DrawerMenu = () => {
  const dispatch = useDispatch();
  const user = useIsLoggedIn();
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
