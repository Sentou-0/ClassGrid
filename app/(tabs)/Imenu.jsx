import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import { FlatList, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const HeaderDropdownMenu = ({ options, onSelect }) => {
  const navigation = useNavigation();
    const handleLogout = () =>{
      setVisible(false);
      setTimeout(() => {
        alert("You have logged out!");
      }, 300);
    navigation.navigate("index"); 
    }
  const [visible, setVisible] = useState(false);
  const handleSelect = (item) => {
    onSelect(item);
    setVisible(false);
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Menu ▼</Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdownMenu}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    if (item.value === "Logout") {
                      handleLogout();
                    } else {
                      handleSelect(item.value);
                      setVisible(false);
                    }
                  }}
                >
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const RoomScheduleTable = ({ roomSchedules }) => {
  return (
    <ScrollView horizontal>
      <View style={styles.tableContainer}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.headerCell]}>Room</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Subject</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Time</Text>
        </View>
        {Object.entries(roomSchedules).map(([room, entries]) =>
          entries.map((entry, idx) => (
            <View key={`${room}-${idx}`} style={styles.tableRow}>
              {idx === 0 && (
                <Text style={styles.tableCell} rowSpan={entries.length}>
                  {room}
                </Text>
              )}
              <Text style={styles.tableCell}>{entry.subject}</Text>
              <Text style={styles.tableCell}>{entry.time}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const AccountModal = ({ visible, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.trim() === '') {
      alert('Please enter a new password.');
      return;
    }
    // Here you can implement actual password change logic
    alert('Password changed successfully!');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  const handleCancel = () => {
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Password</Text>
          <TextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#aaa' }]}
              onPress={handleCancel}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const DropdownExample = () => {
  const [headerSelection, setHeaderSelection] = useState(null);
  const [schedule, setSchedule] = useState([
    { instructor: 'Iratus Glenn Cruz', subject: 'Software Engineering', time: '8:00 AM - 9:00 AM', room: 'Computer lab' },
    { instructor: 'Michael G. Albino', subject: 'Information Management', time: '9:00 AM - 10:00 AM', room: 'Hybrid Lab' },
  ]);
  const [accountSubView, setAccountSubView] = useState(null);
  const [accountModalVisible, setAccountModalVisible] = useState(false);

  const headerOptions = [
    { label: 'My Schedule', value: 'My Schedule' },
    { label: 'Room Schedule', value: 'Room Schedule' },
    { label: 'Account Setting', value: 'Account Setting' },
    { label: 'Logout', value: 'Logout' },
  ];

  const showCourseSchedule = headerSelection === 'My Schedule';
  const showRoomSchedule = headerSelection === 'Room Schedule';
  const showAccountSetting = headerSelection === 'Account Setting';

  // Compile schedules by room
  const roomSchedules = schedule.reduce((acc, entry) => {
    if (!acc[entry.room]) acc[entry.room] = [];
    acc[entry.room].push({ subject: entry.subject, time: entry.time });
    return acc;
  }, {});

  const handleAccountButton = () => {
    setAccountModalVisible(true);
  };

  const handleTermsOfUse = () => {
    setAccountSubView('terms');
  };

  const handlePrivacy = () => {
    setAccountSubView('privacy');
  };

  const termsOfUseContent = `
Step-by-Step Guide to Using the App:

1. Open the app and log in with your credentials.
2. Use the Menu dropdown to select options like My Schedule, Room Schedule, or Account Setting.
3. In My Schedule, view your personal schedule entries.
4. In Room Schedule, check schedules by room.
5. In Account Setting, manage your account, view terms, or privacy policy.
6. To add or edit schedules, use the Scheduler option if available.
7. Logout when done to secure your account.
  `;

  const privacyContent = `
Privacy Policy:

This app collects minimal personal information necessary for functionality, such as login credentials and schedule data. We do not share your data with third parties without consent. Your data is stored securely and used only for app purposes. For more details, contact support.
  `;

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/736x/23/98/a0/2398a0aa5dca1de3c2427a37c4ae5232.jpg', // Replace with your actual background image URL
      }}
      resizeMode="cover"
      style={styles.container}
    >
    <View style={styles.container}>
      <HeaderDropdownMenu options={headerOptions} onSelect={setHeaderSelection} />
      {headerSelection && (
        <Text style={styles.selectedText}>Selected Menu: {headerSelection}</Text>
      )}

      {showCourseSchedule && (
        <>
          <Text style={styles.scheduleTitle}>My Schedule</Text>
          {schedule.length === 0 ? (
            <Text style={{ padding: 10, fontStyle: 'italic', color: 'white' }}>
              No subjects added in Scheduler.
            </Text>
          ) : (
            <View style={styles.courseScheduleTableContainer}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.headerCell]}>Instructor</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>Room</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>Subject</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>Time</Text>
              </View>
              {schedule.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.instructor}</Text>
                  <Text style={styles.tableCell}>{item.room}</Text>
                  <Text style={styles.tableCell}>{item.subject}</Text>
                  <Text style={styles.tableCell}>{item.time}</Text>
                </View>
              ))}
            </View>
          )}
        </>
      )}

      {showRoomSchedule && (
        <>
          <Text style={styles.scheduleTitle}>Room Schedule</Text>
          {schedule.length === 0 ? (
            <Text style={{ padding: 10, fontStyle: 'italic', color: 'white' }}>
              No schedule entries.
            </Text>
          ) : (
            <RoomScheduleTable roomSchedules={roomSchedules} />
          )}
        </>
      )}

      {showAccountSetting && (
        <>
          <Text style={styles.scheduleTitle}>Account Setting</Text>
          <View style={styles.accountButtons}>
            <TouchableOpacity style={styles.accountButton} onPress={handleAccountButton}>
              <Text style={styles.accountButtonText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountButton} onPress={handleTermsOfUse}>
              <Text style={styles.accountButtonText}>Terms of Use</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountButton} onPress={handlePrivacy}>
              <Text style={styles.accountButtonText}>Privacy</Text>
            </TouchableOpacity>
          </View>
          {accountSubView === 'terms' && (
            <View style={styles.contentView}>
              <View style={styles.contentHeader}>
                <Text style={styles.contentTitle}>Terms of Use</Text>
                <TouchableOpacity onPress={() => setAccountSubView(null)}>
                  <Text style={styles.closeButton}>x</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.contentScroll}>
                <Text style={styles.contentText}>{termsOfUseContent}</Text>
              </ScrollView>
            </View>
          )}
          {accountSubView === 'privacy' && (
            <View style={styles.contentView}>
              <View style={styles.contentHeader}>
                <Text style={styles.contentTitle}>Privacy</Text>
                <TouchableOpacity onPress={() => setAccountSubView(null)}>
                  <Text style={styles.closeButton}>x</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.contentScroll}>
                <Text style={styles.contentText}>{privacyContent}</Text>
              </ScrollView>
            </View>
          )}
        </>
      )}

      <AccountModal
        visible={accountModalVisible}
        onClose={() => setAccountModalVisible(false)}
      />
    </View>
  </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 0,
    flex: 1,
  },
  contentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(119, 119, 118, 0.5)',
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerButton: {
    marginTop: 15,
    backgroundColor: '#070707ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  headerButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuItem: {
    padding: 15,
    borderBottomColor: '#000000ff',
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
  },
  selectedText: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 10,
    color: 'black',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
    minWidth: 300,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    backgroundColor: '#070707ff',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  headerCell: {
    color: 'white',
    fontWeight: 'bold',
  },
  courseScheduleTableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  accountButtons: {
    flexDirection: 'column',
    marginVertical: 20,
  },
  accountButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  accountButtonText: {
    color: 'black',
    fontSize: 16,
  },
  contentView: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 400,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  contentScroll: {
    padding: 10,
    maxHeight: 300,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DropdownExample;
