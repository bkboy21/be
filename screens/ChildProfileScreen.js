import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ChildProfileScreen = () => {
  const [childData, setChildData] = useState({ name: '', age: '', gender: '', dob: '' });
  const [loading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // DatePicker visibility state
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store the selected date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'children', 'childID')); // Replace 'childID' with actual ID
        if (userDoc.exists()) {
          setChildData(userDoc.data());
          if (userDoc.data().dob) {
            setSelectedDate(new Date(userDoc.data().dob)); // Set initial date from DB if exists
          }
        }
      } catch (error) {
        console.error('Error fetching child data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'children', 'childID'), { ...childData, dob: selectedDate.toISOString() }); // Replace 'childID' with actual ID
      alert('Child profile saved successfully');
    } catch (error) {
      console.error('Error saving child data:', error.message);
    }
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setChildData({ ...childData, dob: date.toDateString() });
    setDatePickerVisible(false); // Hide DatePicker after selection
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter child name"
          value={childData.name}
          onChangeText={text => setChildData({ ...childData, name: text })}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter child age"
          value={childData.age}
          onChangeText={text => setChildData({ ...childData, age: text })}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter child gender"
          value={childData.gender}
          onChangeText={text => setChildData({ ...childData, gender: text })}
        />
      </View>

      {/* Date Picker Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text>{selectedDate ? selectedDate.toDateString() : 'Select Date'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Modal for DatePicker */}
      <Modal
        transparent={true}
        visible={isDatePickerVisible}
        animationType="slide"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.datePickerContainer}>
            <DatePicker
              date={selectedDate}
              onDateChange={handleConfirmDate}
              mode="date"
              maximumDate={new Date()} // Restrict future dates
            />
            <TouchableOpacity
              onPress={() => setDatePickerVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChildProfileScreen;
