// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
// import GoogleSignIn from './screens/GoogleSignIn';
import AppNavigator from './navigation/AppNavigator'; // Your bottom tab navigator
import { auth } from './firebaseConfig'; // Your Firebase configuration

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) return null; // Optionally, show a loading indicator

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={AppNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            {/* <Stack.Screen name="GoogleSignIn" component={GoogleSignIn} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
