import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Octicons, FontAwesome } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { View } from "react-native";

export type RootStackParamList = {
  MainApp: undefined
  Detail: {id: number, name: string}
}

export type RootTabParamList = {
  HomeTab: undefined
  AnalyticsTab: undefined
  ActivityTab: undefined
  ProfileTab: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<RootTabParamList>()

function BottomTabs() {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let IoniconsIcon: keyof typeof Ionicons.glyphMap
        let OcticonsIcon: keyof typeof Octicons.glyphMap 
        let FontAwesomeIcon: keyof typeof FontAwesome.glyphMap
        if (route.name === "HomeTab") {
          IoniconsIcon = focused? "home" : "home-outline"
        } else if (route.name === "AnalyticsTab") {
          IoniconsIcon = focused? "stats-chart" : "stats-chart-outline"
        } else if (route.name === "ActivityTab") {
          OcticonsIcon = focused ? "bell-fill" : "bell"
        } else if (route.name === "ProfileTab") {
          FontAwesomeIcon = focused ? "user-circle-o" : "user-circle"
        }

        return (
        <View style={{flex: 1, justifyContent: "center", flexDirection: "row"}}>
        <Ionicons name={IoniconsIcon} size={size} color={color} />
        <Octicons name={OcticonsIcon} size={size} color={color} />
        <FontAwesome name={FontAwesomeIcon} size={size} color={color} />
        </View>
      )
      },
      tabBarStyle: {
        backgroundColor: "#EEEEEE",
        borderBlockColor: "gray",
        borderTopWidth: 1
      },
      tabBarActiveTintColor: "#0055DA",
      tabBarInactiveTintColor: "gray"
    })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{title: "Home", headerStyle: {backgroundColor: "#0055DA", borderBottomWidth: 2, borderBlockColor: "grey"}}}/>
      <Tab.Screen name="AnalyticsTab" component={AnalyticsScreen} options={{title: "Analytics", headerStyle: {backgroundColor: "#0055DA", borderBottomWidth: 2, borderBlockColor: "grey"}}}/>
      <Tab.Screen name="ActivityTab" component={ActivityScreen} options={{title: "Activity", headerStyle: {backgroundColor: "#0055DA", borderBottomWidth: 2, borderBlockColor: "grey"}}}/>
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{title: "Profile", headerStyle: {backgroundColor: "#0055DA", borderBottomWidth: 2, borderBlockColor: "grey"}}}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainApp">
        <Stack.Screen name="MainApp" component={BottomTabs} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}