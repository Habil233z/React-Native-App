import { View, Text, Button } from "react-native";
import { getItem } from "../utils/AsyncStorage";

export default function HomeScreen() {
    const token = getItem("userToken")

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>This is home</Text>
            <Text>Token: {token}</Text>
        </View>
    )
}