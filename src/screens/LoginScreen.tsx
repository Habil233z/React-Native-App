import { useContext, useState } from "react";
import { View, Text, Button, TextInput, Alert, TouchableOpacity } from "react-native";
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
            <View className="bg-white justify-center items-center m-h-150 px-5 rounded-xl border border-gray-400 pb-4">
                <Text className="font-bold text-blue-700 text-4xl mt-4">SociNet</Text>
                <Text className="mt-2 font-semibold">Login to SociNet Data Analytics App</Text>
                    <View className="w-[70%] items-start mt-2 mb-4">
                        <View className="flex-row border border-gray-400 bg-gray-200 h-8 mb-2"><TextInput className="p-0 w-full h-full pl-2" placeholder="Email or Username" onChangeText={setEmailOrUsername}/></View>
                        <View className="flex-row border border-gray-400 bg-gray-200 h-8"><TextInput className="p-0 w-full h-full pl-2" placeholder="Password" secureTextEntry={true} onChangeText={setPassword}/></View>
                    </View>
                <TouchableOpacity className="bg-gray-200 border border-l-gray-700 h-8 w-[50px] items-center justify-center" activeOpacity={0.5} onPress={handleClick}><Text>Login</Text></TouchableOpacity>
            </View>
        </View>
    )
}