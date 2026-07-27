import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CandidateHomeScreen from "./candidate/CandidateHomeScreen";
import LoginScreen from "./auth/LoginScreen";
import RecruiterHomeScreen from "./recruiter/RecruiterHomeScreen";
import AdminHomeScreen from "./admin/AdminHomeScreen";
import RegisterScreen from "./auth/RegisterScreen";

const Stack = createNativeStackNavigator()

function AppScreen() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="RecruiterHome" component={RecruiterHomeScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Home" component={CandidateHomeScreen} />
                    <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default AppScreen