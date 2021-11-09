import React from "react";
import { View, StatusBar } from "react-native";
import AddDeckComponent from "./components/views/AddDeck";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./components/reducers";
import Home from "./components/views/Home";
import styles from "./utils/styles";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Deck from "./components/views/Deck";
import Quiz from "./components/views/Quiz";
import AddCard from "./components/views/AddCard";
import { setLocalNotification, registerForPushNotificationsAsync } from './utils/helpers'
import { useEffect } from "react";

const AppEntry = () => {
  const Tab = createBottomTabNavigator();
useEffect(() => {
  setLocalNotification()
}, [])
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "md-home-sharp" : "md-home-outline";
          } else if (route.name === "Add Deck") {
            iconName = focused ? "add-circle-sharp" : "add-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#61dafd",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add Deck" component={AddDeckComponent} />
    </Tab.Navigator>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <StatusBar animated={true} backgroundColor="#61dafb" />

          <Stack.Navigator>
            <Stack.Screen
              name="AppEntry"
              component={AppEntry}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Deck" component={Deck} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Add Card" component={AddCard} />
          </Stack.Navigator>
        </View>
      </Provider>
    </NavigationContainer>
  );
}
