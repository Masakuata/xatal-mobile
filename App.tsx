import * as React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Login from './pages/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from './pages/signup';
import { primaryColor } from './styles/base';
import { darkColors } from '@rneui/base';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false}}>
        <Stack.Screen
          name="login"
          component={Login} />
        <Stack.Screen
        name="signup"
        component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;