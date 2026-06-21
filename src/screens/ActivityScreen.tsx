import { Octicons } from "@expo/vector-icons"
import { View, Text, Image, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as SecureStore from "expo-secure-store"
import { useState, useEffect } from "react"
import { api, API_URL } from "../config/api"

export default function ActivityScreen() {
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [followers, setFollowers] = useState([])

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

    async function getLatestFollower() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/mobile/latestFollowers", {headers: {Authorization: `Bearer ${token}`}})
            setFollowers(response.data.data.latestFollowers)
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

             <View className="items-center justify-center bg-gray-100">
                <View className="w-[70%] h-full">
                <FlatList
                data={followers}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({item}: any) => (
                    <View className="flex flex-row mt-4 w-full bg-white p-4 border border-gray-400 rounded-2xl">
                        <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                            <Image className="w-full h-full" resizeMode="cover" source={{uri: item.follower.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")}}/>
                        </View>
                        <View className="w-[80%] pb-15">
                            <View className="ml-2">

                                <Text className="font-bold text-2xl">{item.follower.username}</Text>
                                <View className="">
                                    <Text>Has follow you at: {item.create_at}</Text>
                                    
                                </View>
                                <View className="flex flex-row-reverse w-full mt-2 justify-between">
                                 
                                </View>
                            </View>
                        </View>
                            
                    </View>
                )}></FlatList>
                </View>
            </View>
        </SafeAreaView>
    )
}