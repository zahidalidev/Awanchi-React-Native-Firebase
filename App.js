import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"

// screens
import LoginScreen from "./app/screens/auth/Index"
// ------ employee
import UserDashboard from './app/screens/user/UserDashboard';
import ProfileScreen from './app/screens/user/ProfileScreen';
import ShareHolderPhotos from './app/screens/user/ShareHolderPhotos';
import ShareHolderInfo from './app/screens/user/ShareHolderInfo';
import OrganicOrders from './app/screens/user/organicOrders/OrganicOrders';
import AddOrganicOrders from './app/screens/user/organicOrders/AddOrganicOrders';
import OrderDetail from './app/screens/user/OrderDetail';
import FakeOrders from './app/screens/user/fakeOrders/FakeOrders';
import AddFakeOrders from './app/screens/user/fakeOrders/AddFakeOrders';
// ------ manager
import ManagerDashboard from './app/screens/manager/ManagerDashboard';
import ManagerProfileScreen from './app/screens/manager/ManagerProfileScreen';
import ManagerEmployees from './app/screens/manager/employees/ManagerEmployees';
import AddEmployee from './app/screens/manager/employees/AddEmployee';


// components
import AppDrawer from './app/components/AppDrawer';

// config
import Colors from './app/config/Colors';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

export default function App() {

  const Login = () => {
    return <Stack.Navigator headerMode="none" initialRouteName="LoginScreen" >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  }

  return (
    <NavigationContainer>

      <Drawer.Navigator initialRouteName="Login"
        drawerType={"front"}
        overlayColor="transparent"
        edgeWidth={100}
        drawerStyle={{ backgroundColor: Colors.white, width: "75%" }}
        drawerContent={(props) => <AppDrawer {...props} />}
      >
        <Stack.Screen name="Login" component={Login} />

        {/* employee */}
        <Drawer.Screen name="UserDashboard" component={UserDashboard} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="ShareHolderPhotos" component={ShareHolderPhotos} />
        <Drawer.Screen name="ShareHolderInfo" component={ShareHolderInfo} />
        <Drawer.Screen name="FakeOrders" component={FakeOrders} />
        <Drawer.Screen name="OrganicOrders" component={OrganicOrders} />
        <Drawer.Screen name="OrderDetail" component={OrderDetail} />
        <Drawer.Screen name="AddOrganicOrders" component={AddOrganicOrders} />
        <Drawer.Screen name="AddFakeOrders" component={AddFakeOrders} />

        {/* manager */}
        <Drawer.Screen name="ManagerDashboard" component={ManagerDashboard} />
        <Drawer.Screen name="ManagerProfileScreen" component={ManagerProfileScreen} />
        <Drawer.Screen name="ManagerEmployees" component={ManagerEmployees} />
        <Drawer.Screen name="AddEmployee" component={AddEmployee} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

