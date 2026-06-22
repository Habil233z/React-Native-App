import { Ionicons } from "@expo/vector-icons"
import { useContext, useEffect, useState } from "react"
import { TouchableOpacity, View, Text, Image, Button } from "react-native"
import { AuthContext } from "../../App"
import { SafeAreaView } from "react-native-safe-area-context"
import { api, API_URL } from "../config/api"
import * as SecureStore from "expo-secure-store"
import { User } from "../utils/types"
import { colorScheme as themeState, useColorScheme } from "nativewind"

export default function ProfileScreen({navigation}: any) {
    const {signOut} = useContext(AuthContext)
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [profile, setProfile] = useState<User>({} as User)
    const [loading, setLoading] = useState<boolean>(true)

    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light")
    const {colorScheme, setColorScheme} = useColorScheme()

    async function getProfile() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/getProfile", {headers: {Authorization: `Bearer ${token}`}})
            const profileImage = response.data.data.profile.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")
            setCurrentTheme(colorScheme as any)
            setPhoto_profile(profileImage)
            setProfile(response.data.data.profile)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    function toggleTheme() {
        const newTheme = currentTheme === "light" ? "dark" : "light"
        setCurrentTheme(newTheme)
        setColorScheme(newTheme)
        themeState.set(newTheme)
    }

    useEffect(() => {
        getProfile()
        setColorScheme(colorScheme as any)
        setCurrentTheme(colorScheme as any)
    },[])

    return (
        <SafeAreaView className="flex-1 dark:bg-blue-900">
            <View className={`flex-row justify-between items-center px-4 ${currentTheme === "dark" ? "bg-blue-900" : "bg-blue-700"} pb-2 pt-2`}>
                <Ionicons name="person-circle-outline" size={36} color={"white"}/>
                <View>
                    <Text className={`font-bold text-4xl text-gray-100`}>Profile</Text>
                </View>
                <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                    {!loading && <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>}
                </View>
            </View>


            <View className={`h-full w-full items-center ${currentTheme === "dark" ? "bg-gray-800": "bg-gray-100"}`}>
                <View className={`w-[70%] flex flex-col items-center pb-10 justify-center pt-10 mt-20 rounded-xl border shadow-2xl ${currentTheme === "dark" ? "bg-gray-700 border-gray-900" : "bg-white border-gray-300"}`}>
                    <View className={`h-[96px] w-[96px] rounded-full overflow-hidden border-2 ${currentTheme === "dark" ? "border-gray-200" : "border-gray-800"}`}>
                        {!loading && <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>}
                    </View>
                    <Text className={`mt-5 font-bold text-4xl ${currentTheme === "dark" ? "text-gray-100" : ""}`}>{profile.full_name}</Text>
                    <Text className={`${currentTheme === "dark" ? "text-gray-300" : "text-gray-600"}`}>@{profile.username}</Text>
                    <Text className={`${currentTheme === "dark" ? "text-gray-100" : ""}`}>{profile.bio}</Text>
                    <TouchableOpacity className="bg-gray-200 border border-gray-500 mt-2 h-8 w-[90px] justify-center items-center rounded-xl" activeOpacity={0.5} onPress={() => navigation.navigate("Edit")}><Text>Edit Profile</Text></TouchableOpacity>
                    <TouchableOpacity className="bg-gray-200 border border-gray-500 mt-2 h-8 w-[90px] justify-center items-center rounded-xl" activeOpacity={0.5}><Text>Setting</Text></TouchableOpacity>
                    <TouchableOpacity className="bg-blue-700 dark:bg-gray-700 border border-gray-500 mt-2 h-10 w-[50px] justify-center items-center rounded-xl" activeOpacity={0.5} onPress={toggleTheme}>{colorScheme === "dark" ? <Ionicons name="sunny-outline" size={20} color={"white"}/> : <Ionicons name="moon-outline" size={20} color={"white"}/>}</TouchableOpacity>
                    <View className="mt-20">
                        <TouchableOpacity className="bg-red-800 mt-2 h-10 w-[140px] justify-center items-center rounded-xl flex-row" activeOpacity={0.5} onPress={signOut}><Ionicons name="log-out-outline" size={20} className="mr-4" color={"white"}/><Text className="text-white">Log Out</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}