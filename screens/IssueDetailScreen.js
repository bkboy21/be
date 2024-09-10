// screens/IssueDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IssueDetailScreen = ({ route }) => {
  const { issue } = route.params;

  const getIssueDetail = () => {
    switch (issue.id) {
      case '1':
        return 'Detailed advice on managing sleep problems.';
      case '2':
        return 'Guidance on how to handle feeding issues.';
      case '3':
        return 'Tips on managing behavioral concerns.';
      case '4':
        return 'Potty training strategies and advice.';
      case '5':
        return 'Information on teething and how to soothe your child.';
      default:
        return 'No information available.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{issue.title}</Text>
      <Text style={styles.details}>{getIssueDetail()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  details: {
    fontSize: 20,
    color: '#555',
    lineHeight: 28,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default IssueDetailScreen;
