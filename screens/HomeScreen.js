import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import backgroundImg from '../assets/background.jpg'; // Import the local image

const HomeScreen = () => {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation(); // Access navigation hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = doc(db, 'users', auth.currentUser.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUserName(userData.firstName || 'User');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ImageBackground source={backgroundImg} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.userName}>Hi {userName}</Text>
        <Text style={styles.title}>Welcome to Be Parent</Text>
        <Button
          title="Go to Child Profile"
          onPress={() => navigation.navigate('ChildProfile')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight dark overlay for text readability
    padding: 20,
  },
  userName: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeScreen;
