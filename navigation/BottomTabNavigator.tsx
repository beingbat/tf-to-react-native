import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import DietScreen from '../screens/DietScreen';
import DrugsScreen from '../screens/DrugScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { BottomTabParamList, HomeParamList, AboutParamList, HistoryParamList, DrugsParamList, DietParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Detect"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'} />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={TabAboutNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name={Platform.OS === 'ios' ? 'ios-medkit' : 'md-medkit'} />,
        }}
      />
      <BottomTab.Screen
        name="Medication"
        component={TabDrugsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name={Platform.OS === 'ios' ? 'ios-medical' : 'md-medical'} />,
        }}
      />
      <BottomTab.Screen
        name="Diet Guide"
        component={TabDietNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name={Platform.OS === 'ios' ? 'ios-fast-food' : 'md-fast-food'} />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={TabHistoryNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Predict Malaria' }}
      />
    </HomeStack.Navigator>
  );
}

const AboutTabStack = createStackNavigator<AboutParamList>();

function TabAboutNavigator() {
  return (
    <AboutTabStack.Navigator>
      <AboutTabStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerTitle: 'Malaria Information' }}
      />
    </AboutTabStack.Navigator>
  );
}

const DietTabStack = createStackNavigator<DietParamList>();

function TabDietNavigator() {
  return (
    <DietTabStack.Navigator>
      <DietTabStack.Screen
        name="DietScreen"
        component={DietScreen}
        options={{ headerTitle: 'Diet for Malaria Patients' }}
      />
    </DietTabStack.Navigator>
  );
}


const HistoryTabStack = createStackNavigator<HistoryParamList>();

function TabHistoryNavigator() {
  return (
    <HistoryTabStack.Navigator>
      <HistoryTabStack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          headerTitle: 'Patients Record'
        }}
      />
    </HistoryTabStack.Navigator>
  );
}

const DrugsTabStack = createStackNavigator<DrugsParamList>();

function TabDrugsNavigator() {
  return (
    <DrugsTabStack.Navigator>
      <DrugsTabStack.Screen
        name="DrugsScreen"
        component={DrugsScreen}
        options={{ headerTitle: 'Recommended Medication' }}
      />
    </DrugsTabStack.Navigator>
  );
}