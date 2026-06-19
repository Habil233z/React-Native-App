import { MaterialIcons } from "@expo/vector-icons"
import { useContext } from "react"
import { TouchableOpacity, View } from "react-native"
import { AuthContext } from "../../App"

export default function ProfileScreen() {
    const {signOut} = useContext(AuthContext)
    return (
        <View>
            <TouchableOpacity onPress={signOut}>
                <MaterialIcons name="logout" size={20} color={"red"} />
            </TouchableOpacity>
        </View>
    )
}