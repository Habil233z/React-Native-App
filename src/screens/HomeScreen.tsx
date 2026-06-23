import { View, Text, Image } from "react-native";
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react";
import { api, API_URL } from "../config/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { User } from "../utils/types";
import { useColorScheme } from "nativewind";

export default function HomeScreen() {
    const [profile, setProfile] = useState<User>({} as User)
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [followers, setFollowers] = useState<number|null>(0)
    const [likes, setLikes] = useState<number>(0)
    const [post, setPost] = useState<number>(0)
    const [reply, setReply] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const {colorScheme, setColorScheme} = useColorScheme()

    async function getProfile() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/getProfile", {headers: {Authorization: `Bearer ${token}`}})
            setProfile(response.data.data.profile)
            const profileImage = response.data.data.profile.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")
            setPhoto_profile(profileImage)
            setLoading(false)
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
        setColorScheme(colorScheme as any)
    },[])

    return (
        <SafeAreaView className="flex-1 dark:bg-gray-800 bg-gray-100">
            <View className="flex-row justify-between items-center px-4 bg-gray-100 pb-2 pt-2 dark:bg-gray-800">
                <View>
                    <Text className="font-bold text-4xl text-gray-800 dark:text-gray-100">Hello @{profile.username}</Text>
                    <Text className="text-gray-700 dark:text-gray-300">Below is your performace in:</Text>
                </View>
                <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                    {!loading && <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>}
                </View>
            </View>
            <View className="w-full items-center mt-10">
            <Text className="text-blue-700 text-8xl font-bold">SociNet</Text>
            </View>
            <View className="w-full h-full bg-gray-100 dark:bg-gray-800 mt-20">

            <View className="flex-row justify-between flex-wrap px-4 w-full">
                <View className="bg-white rounded-2xl p-4 shadow-xl w-[48%] mb-4 mt-4 border border-gray-200 dark:border-gray-900 dark:bg-gray-700">
                    <View className="flex-row justify-between items-start mb-4">
                        <MaterialIcons name="people-outline" size={24} color={colorScheme === "dark" ? "white" : "gray"}/>
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-1 dark:text-white">{followers}</Text>
                    <Text className="text-[12px] font-bold text-gray-700 uppercase tracking-wider dark:text-gray-100">Folowers</Text>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-xl w-[48%] mb-4 mt-4 border border-gray-200 dark:border-gray-900 dark:bg-gray-700">
                    <View className="flex-row justify-between items-start mb-4">
                        <MaterialIcons name="favorite-outline" size={24} color={colorScheme === "dark" ? "white" : "gray"}/>
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-1 dark:text-white">{likes}</Text>
                    <Text className="text-[12px] font-bold text-gray-700 uppercase tracking-wider dark:text-gray-100">Likes</Text>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-xl w-[48%] mb-4 border border-gray-200 dark:border-gray-900 dark:bg-gray-700">
                    <View className="flex-row justify-between items-start mb-4">
                        <MaterialIcons name="chat-bubble-outline" size={24} color={colorScheme === "dark" ? "white" : "gray"}/>
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-1 dark:text-white">{post}</Text>
                    <Text className="text-[12px] font-bold text-gray-700 uppercase tracking-wider dark:text-gray-100">Post</Text>
                </View>

                <View className="bg-white rounded-2xl p-4 shadow-xl w-[48%] mb-4 border border-gray-200 dark:border-gray-900 dark:bg-gray-700">
                    <View className="flex-row justify-between items-start mb-4">
                        <MaterialIcons name="reply" size={24} color={colorScheme === "dark" ? "white" : "gray"}/>
                    </View>
                    <Text className="text-[28px] font-bold text-gray-900 mb-1 dark:text-white">{reply}</Text>
                    <Text className="text-[12px] font-bold text-gray-700 uppercase tracking-wider dark:text-gray-100">Reply</Text>
                </View>
            </View>
            </View>
        </SafeAreaView>
    )
}