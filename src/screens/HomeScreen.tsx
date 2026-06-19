import { View, Text, Image } from "react-native";
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react";
import { api, API_URL } from "../config/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
    const [profile, setProfile] = useState({} as any)
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [followers, setFollowers] = useState<number|null>(0)
    const [likes, setLikes] = useState<number>(0)
    const [post, setPost] = useState<number>(0)
    const [reply, setReply] = useState<number>(0)

    async function getProfile() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/getProfile", {headers: {Authorization: `Bearer ${token}`}})
            setProfile(response.data.data.profile)
            const profileImage = response.data.data.profile.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")
            setPhoto_profile(profileImage)
        } catch (error) {
            console.log(error)
        }
    }

    async function getData() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/mobile/count", {headers: {Authorization: `Bearer ${token}`}})
            setFollowers(response.data.data.totalFollower)
            setLikes(response.data.data.totalLikes + response.data.data.totalReplyLikes)
            setPost(response.data.data.totalPost)
            setReply(response.data.data.totalReply)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
        getData()
    },[])

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-row justify-between items-center px-4 bg-blue-700 pb-2 pt-2 border-b border-gray-500">
                <View>
                    <Text className="font-bold text-4xl text-gray-800">Hello @{profile.username}</Text>
                    <Text>Below is your performace</Text>
                </View>
                <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                    <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>
                </View>
            </View>

 
            <View className="flex-row justify-between flex-wrap px-4 mt-4">
                <View className="bg-white rounded-2xl p-4 shadow-xl w-[48%] mb-4 border border-gray-200 ">
                    <View className="flex-row justify-between items-start mb-4">
                        <MaterialIcons name="people-outline" size={24} color={"gray"}/>
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-1">{followers}</Text>
                    <Text className="text-[12px] font-bold text-gray-700 uppercase tracking-wider">Folowers</Text>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-xl w-[48%] mb-4 border border-gray-200 ">
                    <View className="flex-row justify-between items-start mb-4">
                        <MaterialIcons name="favorite-outline" size={24} color={"gray"}/>
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-1">{likes}</Text>
                    <Text className="text-[12px] font-bold text-gray-700 uppercase tracking-wider">Likes</Text>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-xl w-[48%] mb-4 border border-gray-200 ">
                    <View className="flex-row justify-between items-start mb-4">
                        <MaterialIcons name="chat-bubble-outline" size={24} color={"gray"}/>
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-1">{post}</Text>
                    <Text className="text-[12px] font-bold text-gray-700 uppercase tracking-wider">Post</Text>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-xl w-[48%] mb-4 border border-gray-200 ">
                    <View className="flex-row justify-between items-start mb-4">
                        <MaterialIcons name="reply" size={24} color={"gray"}/>
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-1">{reply}</Text>
                    <Text className="text-[12px] font-bold text-gray-700 uppercase tracking-wider">Reply</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}