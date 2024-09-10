// screens/IssueScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const issues = [
  { id: '1', title: 'Sleep Problems' },
  { id: '2', title: 'Feeding Issues' },
  { id: '3', title: 'Behavioral Concerns' },
  { id: '4', title: 'Potty Training' },
  { id: '5', title: 'Teething' },
];

const IssueScreen = ({ navigation }) => {
  const handleSelectIssue = (issue) => {
    navigation.navigate('IssueDetail', { issue });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Common Parenting Issues</Text>
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.issueItem} onPress={() => handleSelectIssue(item)}>
            <Text style={styles.issueTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  issueItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  issueTitle: {
    fontSize: 20,
    color: '#555',
  },
});

export default IssueScreen;
