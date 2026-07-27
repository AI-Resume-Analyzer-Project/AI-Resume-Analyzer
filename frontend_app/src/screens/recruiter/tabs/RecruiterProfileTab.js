import React from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

function RecruiterProfileTab(params) {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        {/* Header Card */}
                        <View style={styles.header}>
                            <View style={styles.avatarCircle}>
                                <Ionicons name="person-outline" size={34} color="#FFFFFF" />
                            </View>

                            <Text style={styles.title}>
                                {/* TODO:
                                        Show user name here from backend / auth state
                                    */}
                                My Profile
                            </Text>

                            <Text style={styles.roleText}>
                                {/* TODO:
                                        Show user role here from backend / auth state
                                    */}
                                Recruiter
                            </Text>

                            <Text style={styles.subtitle}>
                                Manage your account and preferences
                            </Text>
                        </View>

                        {/* Profile Card */}
                        <View style={styles.profileCard}>
                            <View style={styles.profileCardSection}>
                                {/* TODO:
                                        Show Full Name here from backend / auth state
                                    */}

                                {/* TODO:
                                        Show Email Address here from backend / auth state
                                    */}

                                {/* TODO:
                                        Show Role here from backend / auth state
                                        Example: Candidate / Recruiter
                                    */}
                            </View>
                        </View>

                        {/* Action Card */}
                        <View style={styles.actionsCard}>

                            <TouchableOpacity
                                style={styles.actionRow}
                                activeOpacity={0.8}
                                onPress={() => {
                                    // TODO:
                                    // Navigate to Edit Profile screen
                                }}>
                                <View style={styles.actionLeft}>
                                    <Ionicons
                                        name="create-outline"
                                        size={20}
                                        color="#5B5FEF"
                                    />

                                    <Text style={styles.actionText}>
                                        Edit Profile
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={18}
                                    color="#8A90A6"
                                />
                            </TouchableOpacity>

                            <View style={styles.actionDivider} />

                            <TouchableOpacity
                                style={styles.actionRow}
                                activeOpacity={0.8}
                                onPress={() => {
                                    // TODO:
                                    // Navigate to Change Password screen
                                }}>
                                <View style={styles.actionLeft}>
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={20}
                                        color="#5B5FEF"
                                    />

                                    <Text style={styles.actionText}>
                                        Change Password
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={18}
                                    color="#8A90A6"
                                />
                            </TouchableOpacity>

                            <View style={styles.actionDivider} />

                            <TouchableOpacity
                                style={styles.actionRow}
                                activeOpacity={0.8}
                                onPress={() => {
                                    // TODO:
                                    // Navigate to Settings screen
                                }}>
                                <View style={styles.actionLeft}>
                                    <Ionicons
                                        name="settings-outline"
                                        size={20}
                                        color="#5B5FEF"
                                    />

                                    <Text style={styles.actionText}>
                                        Settings
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={18}
                                    color="#8A90A6"
                                />
                            </TouchableOpacity>

                            <View style={styles.actionDivider} />

                            <TouchableOpacity
                                style={styles.actionRow}
                                activeOpacity={0.8}
                                onPress={() => {
                                    navigation.replace('Login')
                                    // TODO:
                                    // Logout user
                                }}>
                                <View style={styles.actionLeft}>
                                    <Ionicons
                                        name="log-out-outline"
                                        size={20}
                                        color="#EF4444"
                                    />

                                    <Text style={[styles.actionText, styles.logoutText]}>
                                        Logout
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={18}
                                    color="#8A90A6"
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FF',
    },

    header: {
        height: 260,
        backgroundColor: '#5B5FEF',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    avatarCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },

    roleText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#E8E8FF',
        marginBottom: 10,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 15,
        color: '#E8E8FF',
        textAlign: 'center',
        lineHeight: 22,
    },

    // Profile Card
    profileCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -30,
        marginBottom: 16,
        borderRadius: 20,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },

    profileCardSection: {
        minHeight: 110,
        justifyContent: 'center',
    },

    // Action Card
    actionsCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },

    actionRow: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    actionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    actionText: {
        marginLeft: 12,
        fontSize: 15,
        fontWeight: '700',
        color: '#172033',
    },

    logoutText: {
        color: '#EF4444',
    },

    actionDivider: {
        height: 1,
        backgroundColor: '#ECECEC',
    },
});

export default RecruiterProfileTab