import "./global.css"
import { createContext, useState, useEffect, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store"

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Octicons, FontAwesome } from "@expo/vector-icons";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EditScreen from "./src/screens/EditScreen"

export type RootStackParamList = {
  LoginScreen: undefined
  MainApp: undefined
  Edit: undefined
}

export type RootTabParamList = {
  Home: undefined
  Analytics: undefined
  Activity: undefined
  Profile: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

function BottomTabs() {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let IoniconsIcon: keyof typeof Ionicons.glyphMap = "home"
        if (route.name === "Home") {
          IoniconsIcon = focused? "home" : "home-outline"
        } else if (route.name === "Analytics") {
          IoniconsIcon = focused? "stats-chart" : "stats-chart-outline"
        } else if (route.name === "Activity") {
          IoniconsIcon = focused ? "notifications" : "notifications-outline"
        } else if (route.name === "Profile") {
          IoniconsIcon = focused ? "person-circle" : "person-circle-outline"
        }

        return (
        <View style={{flex: 1, justifyContent: "center", flexDirection: "row"}}>
        <Ionicons name={IoniconsIcon} size={size} color={color} />
        </View>
      )
      },
      tabBarStyle: {
        backgroundColor: "#C5C7BC",
        borderBlockColor: "black",
        borderTopWidth: 1
      },
      tabBarActiveTintColor: "#0055DA",
      tabBarInactiveTintColor: "black"
    })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Analytics" component={AnalyticsScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Activity" component={ActivityScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

export const AuthContext = createContext<any>(null)


export default function App() {
  const [userToken, setUserToken] = useState<string|null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken")
        setUserToken(token)
      } catch (error) {
        console.log(error)
      }
      finally {
        setIsLoading(false)
      }
    }}, [])
    
    const authContext = useMemo(() => ({
      signIn: async(token: string) => {
        await SecureStore.setItemAsync("userToken", token)
        setUserToken(token)
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("userToken")
        setUserToken(null)
      }
    }), [])

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        ): (
          <>
          <Stack.Screen name="MainApp" component={BottomTabs} options={{headerShown: false}}/>
          <Stack.Screen name="Edit" component={EditScreen} options={{headerShown: false}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  )
}