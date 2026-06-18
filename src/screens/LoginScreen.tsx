import axios from "axios";
import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { setItem } from "../utils/AsyncStorage";

export default function LoginScreen({navigation}: any) {
    const [emailOrUsername, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const [wrong, setWrong] = useState(false)

    async function handleClick(e: any) {
        try {
            const response = await axios.post("http://192.168.18.162:3000/login", {emailOrUsername, password})
            setWrong(false)
            const token = response.data.token
            setItem("userToken", token)
            navigation.navigate("MainApp")
        } catch (error) {
            setWrong(true)
            console.log(error)
        }
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EEEEEE"}}>
            <View style={{backgroundColor: "white", flex: 1, justifyContent: "center", alignItems: "center", maxHeight: "150", paddingHorizontal: "20", borderRadius: "5%"}}>
                <Text>Login to Socidata Analytics App</Text>
                <View>
                <TextInput
                placeholder="Email or Username"
                onChangeText={setEmailOrUsername}
                ></TextInput>
                <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
                ></TextInput>
                </View>
                <Button title="Login" onPress={handleClick}/>
                {wrong && <Text>Username or password are incorrect</Text>}
            </View>
        </View>
    )
}