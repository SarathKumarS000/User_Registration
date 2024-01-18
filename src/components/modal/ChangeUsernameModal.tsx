import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../Styles';

interface ChangeUsernameModalProps {
  newName: string;
  handleUpdateNameConfirm: () => void;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  formError: string | undefined;
  handleModalClose: () => void;
}

const ChangeUsernameModal: React.FC<ChangeUsernameModalProps> = ({
  newName,
  handleUpdateNameConfirm,
  setNewName,
  formError,
  handleModalClose,
}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Change Username</Text>
        <TextInput
          style={styles.modalTextInput}
          placeholder="Enter new username"
          value={newName}
          onChangeText={text => {
            setNewName(text);
          }}
          onSubmitEditing={handleUpdateNameConfirm}
        />

        {formError && <Text style={styles.errorText}>{formError}</Text>}

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
  );
};

export default ChangeUsernameModal;
