import { useContext, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
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
        <View className="flex-1 bg-gray-100 justify-center items-center dark:bg-gray-950">
            <View className="bg-white justify-center items-center m-h-150 px-5 rounded-xl border border-gray-300 pb-4 shadow-2xl dark:bg-gray-800 dark:border-gray-900">
                <Text className="font-bold text-blue-700 text-6xl mt-4 dark:text-blue-800">SociNet</Text>
                <Text className="mt-2 font-semibold text-xl dark:text-gray-300">Login to SociNet Data Analytics App</Text>
                    <View className="w-[70%] items-start mt-2 mb-4">
                        <View className="flex-row border border-gray-400 bg-gray-200 h-8 mb-2"><TextInput className="p-0 w-full h-full pl-2" placeholder="Email or Username" onChangeText={setEmailOrUsername}/></View>
                        <View className="flex-row border border-gray-400 bg-gray-200 h-8"><TextInput className="p-0 w-full h-full pl-2" placeholder="Password" secureTextEntry={true} onChangeText={setPassword}/></View>
                    </View>
                <TouchableOpacity className="bg-gray-200 border border-l-gray-500 h-8 w-[50px] items-center justify-center rounded-xl" activeOpacity={0.5} onPress={handleClick}><Text>Login</Text></TouchableOpacity>
            </View>
        </View>
    )
}