import { Octicons } from "@expo/vector-icons"
import { View, Text, Image, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as SecureStore from "expo-secure-store"
import { useState, useEffect } from "react"
import { api, API_URL } from "../config/api"
import { useColorScheme } from "nativewind"

export default function ActivityScreen() {
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [followers, setFollowers] = useState([])
    const [liker, setLiker] = useState([])
    const [replier, setReplier] = useState([])
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
        }
    }

    async function getLatestFollower() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/mobile/latestActivities", {headers: {Authorization: `Bearer ${token}`}})
            setFollowers(response.data.data.latestFollowers)
            setLiker(response.data.data.finalizedLikes)
            setLiker(response.data.data.finalizedReplies)
            setLoading(false)
            return
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
        getLatestFollower()
    },[])

    return (
        <SafeAreaView className="flex-1 dark:bg-gray-800 bg-gray-100">
            <View className="flex-row justify-between items-center px-4 bg-gray-100 pb-2 pt-2 dark:bg-gray-800">
                <Octicons name="bell" size={28} color={colorScheme === "dark" ? "white" : "black"}/>
                <View>
                    <Text className="font-bold text-4xl dark:text-gray-100 text-gray-800">Activity</Text>
                </View>
                <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                    {!loading && <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>}
                </View>
            </View>

            {loading && 
            <View className="items-center justify-center bg-gray-100 dark:bg-gray-800">
                <Text className="dark:text-gray-200">Loading</Text>
            </View>}

            {!loading &&
            <>
             <View className="items-center justify-center bg-gray-100 dark:bg-gray-800">
                <View className="w-[90%] h-full">
                    <View className="w-full items-center">
                    <Text className="mt-4 text-2xl font-semibold dark:text-gray-200">Latest Followers:</Text>
                    </View>
                <FlatList
                data={followers}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({item}: any) => (
                    <View className="flex flex-row mt-4 w-full bg-white p-4 border border-gray-400 rounded-2xl dark:border-gray-900 dark:bg-gray-700">
                        <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800 dark:border-gray-500">
                            <Image className="w-full h-full" resizeMode="cover" source={{uri: item.follower.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")}}/>
                        </View>
                        <View className="w-[80%] pb-15">
                            <View className="ml-2">

                                <Text className="font-bold text-2xl dark:text-gray-200">{item.follower.username}</Text>
                                <View>
                                    <Text className="dark:text-gray-200">Has follow you at: {item.create_at}</Text>
                                </View>
                                <View className="flex flex-row-reverse w-full mt-2 justify-between">
                                </View>
                            </View>
                        </View>
                            
                    </View>
                )}></FlatList>
                </View>
            </View>
            </>
            }
        </SafeAreaView>
    )
}