import { View, Text, Image, TextInput, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store"
import { User } from "../utils/types";
import { useContext, useEffect, useState } from "react";
import { api, API_URL } from "../config/api";
import { AuthContext } from "../../App";

export default function EditScreen({navigation}: any) {
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [full_name, setFull_name] = useState<string>("")
    const [bio, setBio] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const {signIn} = useContext(AuthContext)

    async function getProfile() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/getProfile", {headers: {Authorization: `Bearer ${token}`}})
            setUsername(response.data.data.profile.username)
            setFull_name(response.data.data.profile.full_name)
            setBio(response.data.data.profile.bio)
            const profileImage = response.data.data.profile.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")
            setPhoto_profile(profileImage)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleClick() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.put("/editProfile", {username, full_name, bio}, {headers: {Authorization: `Bearer ${token}`}})
            signIn(response.data.data.token)
            navigation.navigate("MainApp")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])
    
    return (
        <SafeAreaView className="justify-center items-center bg-gray-100 dark:bg-gray-950 h-full w-full pb-20">
            <View  className="bg-white w-[80%] items-center rounded-xl border border-gray-300 dark:bg-gray-800 dark:border-gray-900">
                <Text className="font-bold text-4xl mt-6 text-blue-800">Edit Your Profile</Text>
                <View className="h-[100px] w-[100px] rounded-full overflow-hidden border-2 border-gray-800 dark:border-gray-400">
                    {!loading && <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>}
                </View>
                <View className="w-[90%] py-4">
                    <Text className="text-xl font-semibold mt-2 dark:text-gray-200">Username : </Text><TextInput onChangeText={setUsername} value={username} className="border p-0 pl-2 bg-gray-200 border-gray-400 h-8"></TextInput>
                    <Text className="text-xl font-semibold mt-2 dark:text-gray-200">Full Name : </Text><TextInput onChangeText={setFull_name} value={full_name} className="border p-0 pl-2 bg-gray-200 border-gray-400 h-8"></TextInput>
                    <Text className="text-xl font-semibold mt-2 dark:text-gray-200">Bio : </Text><TextInput onChangeText={setBio} value={bio} className="border p-0 mb-5 pl-2 bg-gray-200 border-gray-400 h-8"></TextInput>
                    <View className="w-full items-center">
                        <TouchableOpacity className="bg-gray-200 border border-gray-500 mt-2 h-8 w-[90px] justify-center items-center rounded-xl" activeOpacity={0.5} onPress={handleClick}><Text>Submit</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}