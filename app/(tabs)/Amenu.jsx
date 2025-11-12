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

const ScheduleTable = ({ schedule, onEdit, onDelete }) => {
  return (
    <View style={styles.tableContainer}>
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.tableCell, styles.headerCell]}>Instructor</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Subject</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Time</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Room</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Actions</Text>
      </View>
      {schedule.length === 0 && (
        <Text style={{ padding: 10, fontStyle: 'italic' }}>No schedule entries.</Text>
      )}
      {schedule.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.instructor}</Text>
          <Text style={styles.tableCell}>{item.subject}</Text>
          <Text style={styles.tableCell}>{item.time}</Text>
          <Text style={styles.tableCell}>{item.room}</Text>
          <View style={[styles.tableCell, styles.actionsCell]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit(index)}
            >
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#ff4d4d' }]}
              onPress={() => onDelete(index)}
            >
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
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

const ScheduleModal = ({ visible, onClose, onSave, initialData }) => {
  const [instructor, setInstructor] = useState(initialData?.instructor || '');
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [room, setRoom] = useState(initialData?.room || '');

  const handleSave = () => {
    if (!instructor.trim() || !subject.trim() || !time.trim() || !room.trim()) {
      alert('Please fill in Instructor, Subject, Time, and Room.');
      return;
    }
    onSave({ instructor: instructor.trim(), subject: subject.trim(), time: time.trim(), room: room.trim() });
    setInstructor('');
    setSubject('');
    setTime('');
    setRoom('');
  };

  const handleClose = () => {
    setInstructor('');
    setSubject('');
    setTime('');
    setRoom('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{initialData ? 'Edit Entry' : 'Add Entry'}</Text>
          <TextInput
            placeholder="Instructor"
            value={instructor}
            onChangeText={setInstructor}
            style={styles.input}
          />
          <TextInput
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
          />
          <TextInput
            placeholder="Time"
            value={time}
            onChangeText={setTime}
            style={styles.input}
          />
          <TextInput
            placeholder="Room"
            value={room}
            onChangeText={setRoom}
            style={styles.input}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#aaa' }]}
              onPress={handleClose}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const InstructorsList = ({ instructors, onSelectInstructor }) => {
  return (
    <View style={styles.tableContainer}>
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
      </View>
      {instructors.length === 0 ? (
        <Text style={{ padding: 10, fontStyle: 'italic' }}>No instructors available.</Text>
      ) : (
        instructors.map((instructor) => (
          <TouchableOpacity
            key={instructor.id}
            style={styles.tableRow}
            onPress={() => onSelectInstructor(instructor.name)}
          >
            <Text style={styles.tableCell}>{instructor.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

const InstructorSchedule = ({ instructorName, schedule, onBack }) => {
  const instructorSchedule = schedule.filter(item => item.instructor === instructorName);
  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back to Instructors</Text>
      </TouchableOpacity>
      <Text style={styles.scheduleTitle}>{instructorName}'s Schedule</Text>
      {instructorSchedule.length === 0 ? (
        <Text style={{ padding: 10, fontStyle: 'italic', color: 'white' }}>
          No schedule entries for {instructorName}.
        </Text>
      ) : (
        <View style={styles.courseScheduleTableContainer}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.headerCell]}>Subject</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Time</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Room</Text>
          </View>
          {instructorSchedule.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.subject}</Text>
              <Text style={styles.tableCell}>{item.time}</Text>
              <Text style={styles.tableCell}>{item.room}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const DropdownExample = () => {
  const [headerSelection, setHeaderSelection] = useState(null);
  const [schedule, setSchedule] = useState([
    { instructor: 'Iratus Glenn Cruz', subject: 'Software Engineering', time: '8:00 AM - 9:00 AM', room: 'Computer lab' },
    { instructor: 'Michael G. Albino', subject: 'Information Management', time: '9:00 AM - 10:00 AM', room: 'Hybrid Lab' },
  ]);
  const [instructors, setInstructors] = useState([
    { id: '1', name: 'Marie Celia Aglibot'},
    { id: '2', name: 'Michael Albino'},
    { id: '3', name: 'Iratus Glenn Cruz'},
    { id: '4', name: 'Donnel Tongoy'},
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const headerOptions = [
    { label: 'My Schedule', value: 'My Schedule' },
    { label: 'Scheduler', value: 'Scheduler' },
    { label: 'Room Schedule', value: 'Room Schedule' },
    { label: 'Instructors', value: 'Instructors' },
    { label: 'Logout', value: 'Logout' },
  ];

  const showSchedule = headerSelection === 'Scheduler';
  const showCourseSchedule = headerSelection === 'My Schedule';
  const showRoomSchedule = headerSelection === 'Room Schedule';
  const showInstructors = headerSelection === 'Instructors';

  const openAddModal = () => {
    setEditingIndex(null);
    setModalVisible(true);
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  const handleSaveEntry = (entry) => {
    if (editingIndex !== null) {
      const newSchedule = [...schedule];
      newSchedule[editingIndex] = entry;
      setSchedule(newSchedule);
    } else {
      setSchedule([...schedule, entry]);
    }
    setModalVisible(false);
  };

  const handleDeleteEntry = (index) => {
    const newSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(newSchedule);
  };

  const handleSelectInstructor = (instructorName) => {
    setSelectedInstructor(instructorName);
  };

  const handleBackToInstructors = () => {
    setSelectedInstructor(null);
  };

  // Compile schedules by room
  const roomSchedules = schedule.reduce((acc, entry) => {
    if (!acc[entry.room]) acc[entry.room] = [];
    acc[entry.room].push({ subject: entry.subject, time: entry.time });
    return acc;
  }, {});

  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/1200x/a1/99/89/a19989a372ed5593c44c09b8241d00f8.jpg', // Replace with your actual background image URL
      }}
      resizeMode="cover"
      style={styles.container}
    >
    <View style={styles.container}>
      <HeaderDropdownMenu options={headerOptions} onSelect={setHeaderSelection} />
      {headerSelection && (
        <Text style={styles.selectedText}>Selected Menu: {headerSelection}</Text>
      )}

      {showSchedule && (
        <>
          <Text style={styles.scheduleTitle}>Scheduler</Text>
          <ScrollView horizontal>
            <ScheduleTable
              schedule={schedule}
              onEdit={openEditModal}
              onDelete={handleDeleteEntry}
            />
          </ScrollView>
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Text style={styles.addButtonText}>+ Add Subject</Text>
          </TouchableOpacity>
        </>
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

      {showInstructors && (
        <>
          <Text style={styles.scheduleTitle}>Instructors</Text>
          {selectedInstructor ? (
            <InstructorSchedule
              instructorName={selectedInstructor}
              schedule={schedule}
              onBack={handleBackToInstructors}
            />
          ) : (
            <InstructorsList
              instructors={instructors}
              onSelectInstructor={handleSelectInstructor}
            />
          )}
        </>
      )}

      <ScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEntry}
        initialData={editingIndex !== null ? schedule[editingIndex] : null}
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
  actionsCell: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  actionButton: {
    backgroundColor: '#070707ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  actionText: {
    color: 'white',
  },
  addButton: {
    marginTop: 15,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'black',
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
    color: 'Black',
    fontSize: 16,
  },
    backButton: {
      marginBottom: 10,
    }
  });
  export default DropdownExample;