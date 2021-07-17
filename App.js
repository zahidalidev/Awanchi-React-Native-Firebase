import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"

// screens
import LoginScreen from "./app/screens/auth/Index"
import UserDashboard from './app/screens/user/UserDashboard';
import AppDrawer from './app/components/AppDrawer';

// config
import Colors from './app/config/Colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

export default function App() {
  const User = () => {
    return <Drawer.Navigator initialRouteName="LoginScreen"
      drawerType={"front"}
      overlayColor="transparent"
      edgeWidth={100}
      drawerStyle={{
        backgroundColor: Colors.white,
        width: "75%"
      }} drawerContent={(props) => <AppDrawer {...props} />} >
      <Drawer.Screen name="UserDashboard" component={UserDashboard} />
    </Drawer.Navigator>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="LoginScreen" >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

