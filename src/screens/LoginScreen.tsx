import { useContext, useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import { api } from "../config/api";
import { AuthContext } from "../../App";

export default function LoginScreen({navigation}: any) {
    const [emailOrUsername, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signIn} = useContext(AuthContext)

    async function handleClick() {
        if (!emailOrUsername || !password) {
            Alert.alert("Must provide username/email and password")
            return
        }
        try {
            const response = await api.post("/login", {emailOrUsername, password})
            signIn(response.data.token)
        } catch (error) {
            Alert.alert("Username/email or password are wrong")
            console.log(error)
        }
    }

    return (
        <View className="flex-1 bg-gray-100 justify-center items-center">
            <View className="flex-1 bg-white justify-center items-center m-h-150 px-5 rounded-xl">
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
            </View>
        </View>
    )
}