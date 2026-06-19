import { View, Text, Image, FlatList } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react";
import { api, API_URL } from "../config/api";
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons";

export default function AnalyticsScreen() {
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [post, setPost] = useState([])

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

    async function getTopPost() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/mobile/topThreads", {headers: {Authorization: `Bearer ${token}`}})
            setPost(response.data.data.topPost)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
        getTopPost()
    },[])

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-row justify-between items-center px-4 bg-blue-700 pb-2 pt-2 border-b border-gray-500">
                <Ionicons name="analytics-outline" size={28}/>
                <View>
                    <Text className="font-bold text-2xl text-gray-800">Top Peforming Thread</Text>
                </View>
                <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                    <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>
                </View>
            </View>

            <FlatList
            data={post}
            renderItem={({post}: any) => 
            <View>
                {post.content}
            </View>
            }/>
        </SafeAreaView>
    )
}