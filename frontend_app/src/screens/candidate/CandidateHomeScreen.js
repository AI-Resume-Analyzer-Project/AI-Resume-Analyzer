import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import HomeTab from './tabs/HomeTab';
import ResumeTab from './tabs/ResumeTab';
import AtsScoreTab from './tabs/AtsScoreTab';
import ProfileTab from './tabs/ProfileTab';

const Tab = createBottomTabNavigator();

function CandidateHomeScreen({navigation}) {
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

                    if (route.name === 'HomeTab') iconName = 'home-outline';
                    if (route.name === 'Resume') iconName = 'document-text-outline';
                    if (route.name === 'ATS Score') iconName = 'analytics-outline';
                    if (route.name === 'Profile') iconName = 'person-outline';

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}>
            <Tab.Screen name="HomeTab" component={HomeTab} />
            <Tab.Screen name="Resume" component={ResumeTab} />
            <Tab.Screen name="ATS Score" component={AtsScoreTab} />
            <Tab.Screen name="Profile" component={ProfileTab} />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    
});

export default CandidateHomeScreen