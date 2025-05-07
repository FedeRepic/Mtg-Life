import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { StatusBar, StyleSheet } from 'react-native';

import HomeScreen from "./screens/HomeScreen"
import { NavigationContainer } from '@react-navigation/native';
//import { Toaster } from 'sonner-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
  
  function RootStack() {
    return (
      <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );  
  } 
  
  export default function App() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Toaster /> */}
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
        <StatusBar
          //animated={true}
          //backgroundColor= "#1a1a1a"
          barStyle="dark-content"
          hidden={true}
        />
      </SafeAreaView>
    );        
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
    },
  });
 