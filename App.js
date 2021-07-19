import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"

// screens
import LoginScreen from "./app/screens/auth/Index"
import UserDashboard from './app/screens/user/UserDashboard';
import ProfileScreen from './app/screens/user/ProfileScreen';
import ShareHolderPhotos from './app/screens/user/ShareHolderPhotos';
import ShareHolderInfo from './app/screens/user/ShareHolderInfo';
import OrganicOrders from './app/screens/user/organicOrders/OrganicOrders';
import AddOrganicOrders from './app/screens/user/organicOrders/AddOrganicOrders';
import OrderDetail from './app/screens/user/OrderDetail';
import FakeOrders from './app/screens/user/fakeOrders/FakeOrders';
import AddFakeOrders from './app/screens/user/fakeOrders/AddFakeOrders';

// components
import AppDrawer from './app/components/AppDrawer';

// config
import Colors from './app/config/Colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

export default function App() {

  const User = () => {
    return <Drawer.Navigator initialRouteName="UserDashboard"
      drawerType={"front"}
      overlayColor="transparent"
      edgeWidth={100}
      drawerStyle={{ backgroundColor: Colors.white, width: "75%" }}
      drawerContent={(props) => <AppDrawer {...props} />}
    >
      <Drawer.Screen name="UserDashboard" component={UserDashboard} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="ShareHolderPhotos" component={ShareHolderPhotos} />
      <Drawer.Screen name="ShareHolderInfo" component={ShareHolderInfo} />
      <Drawer.Screen name="FakeOrders" component={FakeOrders} />
      <Drawer.Screen name="OrganicOrders" component={OrganicOrders} />
      <Drawer.Screen name="OrderDetail" component={OrderDetail} />
      <Drawer.Screen name="AddOrganicOrders" component={AddOrganicOrders} />
      <Drawer.Screen name="AddFakeOrders" component={AddFakeOrders} />
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

