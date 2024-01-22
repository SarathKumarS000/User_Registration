import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from '../../Styles';
import {RouteProps} from '../../common/Interface';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';

const HomeScreen: React.FC<RouteProps> = ({navigation}) => {
  const user = useSelector((state: RootState) => state.user.loggedUser);
  const userList = useSelector((state: any) => state.user.userList);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <SafeAreaView style={styles.safeAreaView}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}>
            <Text style={styles.title}>
              Welcome,{' '}
              <Text style={{color: 'rgb(93, 95, 222)'}}>{user?.firstName}</Text>
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
                          user: item.email,
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
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;
