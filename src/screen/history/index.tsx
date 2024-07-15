
// HistoryScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const DUMMY_DATA = [
  { id: '1', name: 'John Doe', time: '08:30', date: '2024-07-15', department: 'IT' },
  { id: '2', name: 'Jane Smith', time: '09:00', date: '2024-07-15', department: 'HR' },
  { id: '3', name: 'Bob Johnson', time: '09:15', date: '2024-07-14', department: 'Sales' },
  // ... ajoutez plus de données ici
];

const HistoryScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = DUMMY_DATA.filter(item => 
    new Date(item.date).toDateString() === selectedDate.toDateString() &&
    (!selectedDepartment || item.department === selectedDepartment)
  );

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.listItemInfo}>
        <Text style={styles.listItemName}>{item.name}</Text>
        <Text style={styles.listItemTime}>{item.time} - {item.department}</Text>
      </View>
    </View>
  );

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const exportData = async (format) => {
    let content = '';
    let filePath = '';
    
    if (format === 'csv') {
      content = 'Name,Time,Date,Department\n';
      filteredData.forEach(item => {
        content += `${item.name},${item.time},${item.date},${item.department}\n`;
      });
      filePath = `${RNFS.DocumentDirectoryPath}/attendance_${Date.now()}.csv`;
      await RNFS.writeFile(filePath, content, 'utf8');
    } else if (format === 'pdf') {
      let htmlContent = '<h1>Attendance Report</h1><table>';
      htmlContent += '<tr><th>Name</th><th>Time</th><th>Date</th><th>Department</th></tr>';
      filteredData.forEach(item => {
        htmlContent += `<tr><td>${item.name}</td><td>${item.time}</td><td>${item.date}</td><td>${item.department}</td></tr>`;
      });
      htmlContent += '</table>';
      
      const options = {
        html: htmlContent,
        fileName: `attendance_${Date.now()}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      filePath = file.filePath;
    }

    await Share.open({
      url: `file://${filePath}`,
      type: format === 'csv' ? 'text/csv' : 'application/pdf',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.title}>Attendance History</Text>
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Icon name="filter-list" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity style={styles.dateSelector} onPress={() => setShowDatePicker(true)}>
              <Icon name="calendar-today" size={24} color="#007AFF" />
              <Text style={styles.dateText}>
                {selectedDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </TouchableOpacity>
            <RNPickerSelect
              onValueChange={(value) => setSelectedDepartment(value)}
              items={[
                { label: 'All Departments', value: null },
                { label: 'IT', value: 'IT' },
                { label: 'HR', value: 'HR' },
                { label: 'Sales', value: 'Sales' },
              ]}
              style={pickerSelectStyles}
              value={selectedDepartment}
              placeholder={{ label: "Select Department", value: null }}
            />
            <TouchableOpacity style={styles.applyButton} onPress={() => setShowFilters(false)}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No attendance records for this date.</Text>
        }
      />

      <View style={styles.exportContainer}>
        <TouchableOpacity style={styles.exportButton} onPress={() => exportData('csv')}>
          <Icon name="description" size={24} color="#fff" />
          <Text style={styles.exportButtonText}>Export CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportButton} onPress={() => exportData('pdf')}>
          <Icon name="picture-as-pdf" size={24} color="#fff" />
          <Text style={styles.exportButtonText}>Export PDF</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },

  
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },





  // title: {
  //   fontSize: 28,
  //   fontWeight: 'bold',
  //   color: '#007AFF',
  // },
  // dateSelector: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 15,
  //   backgroundColor: '#f0f0f0',
  //   borderRadius: 10,
  //   marginHorizontal: 20,
  //   marginVertical: 15,
  // },
  // dateText: {
  //   fontSize: 16,
  //   color: '#333',
  //   marginLeft: 10,
  // },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listItemInfo: {
    flex: 1,
  },
  listItemName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  listItemTime: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },


  // applyButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  // list: {
  //   flex: 1,
  //   paddingHorizontal: 20,
  // },
  // listItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingVertical: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#f0f0f0',
  // },
  // avatarPlaceholder: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: '#007AFF',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 15,
  // },
  // avatarText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  // listItemInfo: {
  //   flex: 1,
  // },
  // listItemName: {
  //   fontSize: 16,
  //   color: '#333',
  //   fontWeight: '500',
  // },
  // listItemTime: {
  //   fontSize: 14,
  //   color: '#999',
  //   marginTop: 2,
  // },
  // emptyText: {
  //   fontSize: 16,
  //   color: '#999',
  //   textAlign: 'center',
  //   marginTop: 50,
  // },
  exportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  exportButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default HistoryScreen;