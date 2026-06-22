import { View, Text, Image, FlatList } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react";
import { api, API_URL } from "../config/api";
import { SafeAreaView } from "react-native-safe-area-context"
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Post } from "../utils/types";
import { useColorScheme } from "nativewind";

export default function AnalyticsScreen() {
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [post, setPost] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const {colorScheme} = useColorScheme()

    async function getProfile() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/getProfile", {headers: {Authorization: `Bearer ${token}`}})
            const profileImage = response.data.data.profile.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")
            setPhoto_profile(profileImage)
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function getTopPost() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/mobile/topThreads", {headers: {Authorization: `Bearer ${token}`}})
            setPost(response.data.data.topPost)
            setLoading(false)
            return
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTopPost()
        getProfile()
    },[])

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-row justify-between items-center px-4 bg-blue-700 pb-2 pt-2 dark:bg-blue-950">
                <Ionicons name="analytics-outline" size={28} color={colorScheme === "dark" ? "white" : ""}/>
                <View>
                    <Text className="font-bold text-2xl text-gray-800 dark:text-gray-100">Top Peforming Threads</Text>
                </View>
                <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                    {!loading && <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>}
                </View>
            </View>

            {loading && 
            <View className="items-center justify-center bg-gray-100 dark:bg-gray-950">
                <Text className="dark:text-gray-200">Loading</Text>
            </View>}

            {!loading && 
            <View className="items-center justify-center bg-gray-100 dark:bg-gray-950">
                <View className="w-[90%] h-full">
                <FlatList
                data={post}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}: any) => (
                    <View className="flex flex-row mt-4 w-full bg-white p-4 border border-gray-400 rounded-2xl dark:border-gray-900 dark:bg-gray-800">
                        <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800 dark:border-gray-500">
                            <Image className="w-full h-full" resizeMode="cover" source={{uri: item.creator_photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")}}/>
                        </View>
                        <View className="w-[80%] pb-15">
                            <View className="ml-2">
                                <Text className="dark:text-gray-200">{item.created_at}</Text>
                                <Text className="font-bold text-xl dark:text-gray-200">{item.created_by}</Text>
                                <View>
                                    <Text className="dark:text-gray-200">{item.content}</Text>
                                    {item.image !== "http://localhost:3000/uploads/" &&
                                    <View className="max-w-full max-h-[120px]">
                                        <Image className="h-full w-full" source={{uri: item.image.replace("http://localhost:3000/uploads/", API_URL+"uploads/")}} ></Image>
                                    </View>
                                    }
                                </View>
                                <View className="flex flex-row-reverse w-full mt-2 justify-between">
                                    <View className="flex flex-row justify-center items-center">
                                        <Text className="text-2xl dark:text-gray-200">{item._count.likes}</Text><FontAwesome name="heart" size={18} color={"red"}/>
                                    </View>
                                    <View className="flex flex-row justify-center items-center">
                                        <MaterialCommunityIcons name="message-reply-text-outline" size={18} color={colorScheme === "dark" ? "white" : ""}/><Text className="text-2xl dark:text-gray-200">{item._count.replies}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                            
                    </View>
                )}></FlatList>
                </View>
            </View>
            }  
        </SafeAreaView>
    )
}