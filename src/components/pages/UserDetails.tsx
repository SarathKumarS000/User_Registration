import React from 'react';
import {View, Text} from 'react-native';
import styles from '../Styles'; // Import the styles

const UserDetails = ({route}) => {
  const {user} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.userDetailsContainer}>
        <Text style={styles.userTitle}>User Details</Text>
        <View style={styles.separator} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>
            {user.firstName + ' ' + user.lastName}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{user.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Username:</Text>
          <Text style={styles.detailValue}>{user.userName}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;
