import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { useContext, useEffect, useState } from "react"
import { TouchableOpacity, View, Text, Image, Button } from "react-native"
import { AuthContext } from "../../App"
import { SafeAreaView } from "react-native-safe-area-context"
import { api, API_URL } from "../config/api"
import * as SecureStore from "expo-secure-store"
import { User } from "../utils/types"

export default function ProfileScreen({navigation}: any) {
    const {signOut} = useContext(AuthContext)
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [profile, setProfile] = useState<User>({} as User)

    async function getProfile() {
        try {
            const token = await SecureStore.getItemAsync("userToken")
            const response = await api.get("/getProfile", {headers: {Authorization: `Bearer ${token}`}})
            const profileImage = response.data.data.profile.photo_profile.replace("http://localhost:3000/uploads/", API_URL+"uploads/")
            setPhoto_profile(profileImage)
            setProfile(response.data.data.profile)
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
                <FontAwesome name="user-circle" size={28}/>
                <View>
                    <Text className="font-bold text-4xl text-gray-800">Profile</Text>
                </View>
                <View className="h-[48px] w-[48px] rounded-full overflow-hidden border-2 border-gray-800">
                    <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>
                </View>
            </View>


            <View className="h-full items-center">
                <View className="w-[70%] bg-white flex flex-col items-center pb-10 pt-10 mt-20 rounded-xl">
                    <View className="h-[96px] w-[96px] rounded-full overflow-hidden border-2 border-gray-800">
                        <Image source={{uri: photo_profile}} className="w-full h-full" resizeMode="cover"></Image>
                    </View>
                    <Text className="mt-5 font-bold text-4xl">{profile.full_name}</Text>
                    <Text className="text-gray-600">@{profile.username}</Text>
                    <Text>{profile.bio}</Text>
                    <Button title="Edit Profile" onPress={() => navigation.navigate("Edit")}/>
                    <Button title="Setting"/>
                    <Button title="Privacy"/>

                    <View className="mt-5 ">
                        <Button title="Logout" onPress={signOut}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}