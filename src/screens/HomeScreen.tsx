import { View, Text, Button } from "react-native";

export default function HomeScreen({navigation}: any) {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>This is home</Text>
            <Button
                title="Go to detail"
                onPress={() => {
                    navigation.navigate("Detail", {id: 2, name: "Shoes"})
                }}
            />
        </View>
    )
}