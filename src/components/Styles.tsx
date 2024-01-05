import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(93, 95, 222)',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: 'rgb(58, 58, 60)',
    borderRadius: 8,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 16,
  },
  label: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    width: 80,
  },
  root: {
    backgroundColor: '#000000',
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  subtitle: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  textInput: {
    color: '#FFFFFF',
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  errorText: {
    color: 'red',
  },
  userRow: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  hamburgerIconContainer: {
    padding: 0,
    marginLeft: 0,
  },
  hamburgerIcon: {
    width: 35,
    height: 35,
  },
  boxContainer: {
    backgroundColor: 'rgba(235, 235, 245, 0.6)',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  boxHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  listContainer: {
    maxHeight: 600,
  },
  container: {
    backgroundColor: '#000000',
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  userDetailsContainer: {
    backgroundColor: '#362659',
    borderRadius: 10,
    padding: 16,
    paddingVertical: 32,
  },
  userTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: '#6E4C88',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
    width: 220,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  modalButton: {
    alignItems: 'center',
    backgroundColor: 'rgb(93, 95, 222)',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  backButton: {
    color: 'blue',
    fontSize: 18,
  },
});
