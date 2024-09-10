// navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChildProfileScreen from '../screens/ChildProfileScreen';
import IssueScreen from '../screens/IssueScreen';
import IssueDetailScreen from '../screens/IssueDetailScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const IssueStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Issues" component={IssueScreen} />
      <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Issues" component={IssueStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="ChildProfile" component={ChildProfileScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
