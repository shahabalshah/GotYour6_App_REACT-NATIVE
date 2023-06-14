import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Verification from '../screens/Verification';
import ConnectWatch from '../screens/ConnectWatch';
import ScanWatch from '../screens/ScanWatch';
import Greetings from '../screens/Greetings';
import Packages from '../screens/Packages';
import Home from '../screens/Home';
import Contacts from '../screens/Contacts';
import Settings from '../screens/Settings';
import More from '../screens/More';
import PrimaryText from '../components/PrimaryText';
import GadgetDetails from '../screens/GadgetDetails';
import Loading from '../screens/Loading';
import ForgotPassword from '../screens/ForgotPassword';
import ResetKey from '../screens/ResetKey';

const AuthNavigationStack = createNativeStackNavigator();
const AuthNavigationHandler = () => {
  return (
    <AuthNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthNavigationStack.Screen component={Login} name="Login" />
      <AuthNavigationStack.Screen component={SignUp} name="SignUp" />
      <AuthNavigationStack.Screen
        component={Verification}
        name="Verification"
      />
      <AuthNavigationStack.Screen
        component={ConnectWatch}
        name="ConnectWatch"
      />
      <AuthNavigationStack.Screen component={ScanWatch} name="ScanWatch" />
      <AuthNavigationStack.Screen component={Loading} name="Loading" />
      <AuthNavigationStack.Screen component={Greetings} name="Greetings" />
      <AuthNavigationStack.Screen component={Packages} name="Packages" />
      <AuthNavigationStack.Screen component={ForgotPassword} name='ForgotPassword'/>
      <AuthNavigationStack.Screen component={ResetKey} name='ResetKey'/>
    </AuthNavigationStack.Navigator>
  );
};

const HomeNavigationStack = createNativeStackNavigator();
const HomeStackHandler = () => {
  return (
    <HomeNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeNavigationStack.Screen component={Home} name="Home" />
    </HomeNavigationStack.Navigator>
  );
};

const SettingsNavigationStack = createNativeStackNavigator();
const SettingsStackHandler = () => {
  return (
    <SettingsNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsNavigationStack.Screen component={Settings} name="Settings" />
    </SettingsNavigationStack.Navigator>
  );
};

const MoreNavigationStack = createNativeStackNavigator();
const MoreStackHandler = () => {
  return (
    <MoreNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MoreNavigationStack.Screen component={More} name="More" />
    </MoreNavigationStack.Navigator>
  );
};

const ContactsNavigaitonStack = createNativeStackNavigator();
const ContactsStackHandler = () => {
  return (
    <ContactsNavigaitonStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ContactsNavigaitonStack.Screen component={Contacts} name="Contacts" />
    </ContactsNavigaitonStack.Navigator>
  );
};

const BottomTabs = createBottomTabNavigator();
const BottomTabsHandler = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTabs.Screen
        component={HomeStackHandler}
        name="HomeStackHandler"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <Icon
                  name="home"
                  size={24}
                  color={focused ? '#27AAE1' : '#d3d3d3'}
                />
                <PrimaryText
                  text={'Home'}
                  customStyles={{color: focused ? '#27AAE1' : '#d3d3d3'}}
                />
              </>
            );
          },
          tabBarShowLabel: false,
        }}
      />
      <BottomTabs.Screen
        component={SettingsStackHandler}
        name="SettingsStackHandler"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <Icon
                  name="settings"
                  size={24}
                  color={focused ? '#27AAE1' : '#d3d3d3'}
                />
                <PrimaryText
                  text={'Setup'}
                  customStyles={{color: focused ? '#27AAE1' : '#d3d3d3'}}
                />
              </>
            );
          },
          tabBarShowLabel: false,
        }}
      />
      <BottomTabs.Screen
        component={ContactsStackHandler}
        name="ContactsStackHandler"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <Icon
                  name="contacts"
                  size={24}
                  color={focused ? '#27AAE1' : '#d3d3d3'}
                />
                <PrimaryText
                  text={'Contacts'}
                  customStyles={{color: focused ? '#27AAE1' : '#d3d3d3'}}
                />
              </>
            );
          },
          tabBarShowLabel: false,
        }}
      />
      <BottomTabs.Screen
        component={MoreStackHandler}
        name="MoreStackHandler"
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <Icon
                  name="more"
                  size={24}
                  color={focused ? '#27AAE1' : '#d3d3d3'}
                />
                <PrimaryText
                  text={'More'}
                  customStyles={{color: focused ? '#27AAE1' : '#d3d3d3'}}
                />
              </>
            );
          },
          tabBarShowLabel: false,
        }}
      />
    </BottomTabs.Navigator>
  );
};

const MainNavigationStack = createNativeStackNavigator();
const MainNavigationStackHandler = () => {
  return (
    <MainNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainNavigationStack.Screen component={Splash} name="Splash" />
      <MainNavigationStack.Screen
        component={AuthNavigationHandler}
        name="AuthNavigationHandler"
      />
      <MainNavigationStack.Screen
        component={BottomTabsHandler}
        name="BottomTabsHandler"
      />
      <MainNavigationStack.Screen component={GadgetDetails} name="GadgetDetails"/>
    </MainNavigationStack.Navigator>
  );
};

export default function Router() {
  return (
    <NavigationContainer>
      <MainNavigationStackHandler />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
