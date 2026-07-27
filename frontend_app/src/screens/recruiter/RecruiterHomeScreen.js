import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Text } from "react-native-paper";
import RecruiterHomeTab from "./tabs/RecruiterHomeTab";
import JobDescriptionTab from "./tabs/JobDescriptionTab";
import RankingTab from "./tabs/RankingTab";
import RecruiterProfileTab from "./tabs/RecruiterProfileTab";
import Ionicons from "@react-native-vector-icons/ionicons";

const Tab = createBottomTabNavigator()

function RecruiterHomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: '#5B5FEF',
                tabBarInactiveTintColor: '#8A90A6',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '700',
                    marginBottom: 6,
                },
                tabBarStyle: {
                    height: 68,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderTopLeftRadius: 22,
                    borderTopRightRadius: 22,
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    shadowColor: '#1E245F',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 12,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'home-outline';

                    if (route.name === 'Home') iconName = 'home-outline';
                    if (route.name === 'JD') iconName = 'document-text-outline';
                    if (route.name === 'Rankings') iconName = 'trophy-outline';
                    if (route.name === 'Profile') iconName = 'person-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}>
            <Tab.Screen name="Home" component={RecruiterHomeTab} />
            <Tab.Screen name="JD" component={JobDescriptionTab} />
            <Tab.Screen name="Rankings" component={RankingTab} />
            <Tab.Screen name="Profile" component={RecruiterProfileTab} />
        </Tab.Navigator>
    )
}

export default RecruiterHomeScreen