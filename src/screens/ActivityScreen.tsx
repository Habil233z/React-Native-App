import { Octicons } from "@expo/vector-icons"
import { View, Text, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as SecureStore from "expo-secure-store"
import { useState, useEffect } from "react"
import { api, API_URL } from "../config/api"

export default function ActivityScreen() {
    const [photo_profile, setPhoto_profile] = useState<string>("")

    async function getProfile() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/getProfile", {headers: {Authorization: `Bearer ${token}`}})
            const profileImage = response.data.data.profile.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")
            setPhoto_profile(profileImage)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    },[])

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-row justify-between items-center px-4 bg-blue-700 pb-2 pt-2 border-b border-gray-500">
                <Octicons name="bell" size={28}/>
                <View>
                    <Text className="font-bold text-4xl text-gray-800">Activity</Text>
                </View>
                <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                    <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>
                </View>
            </View>
        </SafeAreaView>
    )
}