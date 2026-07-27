import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ATSScoreTab() {

    const getScoreColor = (score) => {
        if (score >= 80) {
            return '#22C55E';
        }

        if (score >= 60) {
            return '#F59E0B';
        }

        return '#EF4444';
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoCircle}>
                                    <Text style={styles.chartIcon}>📊</Text>
                                </View>
                            </View>

                            <Text style={styles.title}>
                                ATS Analysis
                            </Text>

                            <Text style={styles.subtitle}>
                                See how your resume{"\n"}
                                performs
                            </Text>
                        </View>

                        {/* Resume Information Card */}
                        <View style={styles.resumeCard}>

                            <View style={styles.resumeHeader}>

                                <View style={styles.resumeIconContainer}>
                                    <Text style={styles.resumeIcon}>📄</Text>
                                </View>

                                <View style={styles.resumeDetails}>

                                    {/* TODO: Display Resume Name Here
                                        Example:
                                        Resume_Java.pdf
                                    */}

                                    {/* TODO:
                                        Display Upload Date Here
                                        Example:
                                        Uploaded Today
                                    */}

                                </View>
                            </View>
                        </View>

                        {/* Circular Ats Score */}
                        <View style={styles.scoreSection}>
                            <View style={styles.scoreCircle}>
                                {/* TODO:
                                    Show ATS percentage here after analysis
                                */}

                                {/* TODO:
                                    Show ATS score label here after analysis
                                */}
                            </View>

                            {/* TODO:
                                Show score status text here after analysis
                            */}
                        </View>
                        {/* Resume summary card */}
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Resume Summary</Text>

                            <Text style={styles.summaryText}>
                                {/* TODO:
                                    Show resume summary here after analysis
                                */}
                            </Text>
                        </View>

                        {/* Keyword Match Card */}
                        <View style={styles.keywordCard}>
                            <Text style={styles.cardTitle}>Keyword Match</Text>

                            <View style={styles.keywordProgressTrack}>
                                <View style={styles.keywordProgressFill}>
                                    {/* TODO:
                                        Set progress width from backend after analysis
                                    */}
                                </View>
                            </View>

                            <Text style={styles.keywordPercentage}>
                                {/* TODO:
                                    Show keyword match percentage here
                                */}
                            </Text>

                            <Text style={styles.keywordDescription}>
                                {/* TODO:
                                    Show keyword match description here
                                */}
                            </Text>
                        </View>

                        {/* Missing Skills Card */}
                        <View style={styles.skillsCard}>
                            <Text style={styles.cardTitle}>Missing Skills</Text>

                            <View style={styles.skillsContainer}>
                                {/* TODO:
                                    Loop through missingSkills[] from backend and render chips here
                                    Example:
                                    missingSkills.map((skill) => (
                                    <View key={skill} style={styles.skillChip}>
                                        <Text style={styles.skillChipText}>{skill}</Text>
                                    </View>
                                    ))
                                */}
                            </View>
                        </View>

                        {/* Improvement Suggestions Card */}
                        <View style={styles.suggestionsCard}>
                            <Text style={styles.cardTitle}>Improvement Suggestions</Text>

                            <View style={styles.suggestionItem}>
                                <Ionicons name="checkmark-circle-outline" size={18} color="#22C55E" />
                                <Text style={styles.suggestionText}>
                                    {/* TODO:
                                        Show suggestion text here from backend
                                    */}
                                </Text>
                            </View>

                            <View style={styles.suggestionItem}>
                                <Ionicons name="checkmark-circle-outline" size={18} color="#22C55E" />
                                <Text style={styles.suggestionText}>
                                    {/* TODO:
                                        Show suggestion text here from backend
                                    */}
                                </Text>
                            </View>

                            {/* Re-analyze button and footer */}
                            <View style={styles.suggestionItem}>
                                <Ionicons name="checkmark-circle-outline" size={18} color="#22C55E" />
                                <Text style={styles.suggestionText}>
                                    {/* TODO:
                                        Show suggestion text here from backend
                                    */}
                                </Text>
                            </View>

                            <View style={styles.suggestionItem}>
                                <Ionicons name="checkmark-circle-outline" size={18} color="#22C55E" />
                                <Text style={styles.suggestionText}>
                                    {/* TODO:
                                        Show suggestion text here from backend
                                    */}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.reanalyzeButton}
                            activeOpacity={0.85}
                            onPress={() => {
                                // TODO:
                                // Re-upload or re-analyze resume
                                // Call analysis API again
                                // Refresh ATS results
                            }}
                        >
                            <Text style={styles.reanalyzeButtonText}>RE-ANALYZE RESUME</Text>
                        </TouchableOpacity>

                        <Text style={styles.footerText}>
                            Generated just now
                        </Text>
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
        height: 240,
        backgroundColor: '#5B5FEF',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    logoContainer: {
        marginBottom: 18,
    },

    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    chartIcon: {
        fontSize: 38,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: '#E8E8FF',
        textAlign: 'center',
        lineHeight: 22,
    },

    resumeCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -30,
        marginBottom: 20,
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

    resumeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    resumeIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        backgroundColor: '#EEF0FF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    resumeIcon: {
        fontSize: 30,
    },

    resumeDetails: {
        flex: 1,
        marginLeft: 15,
    },

    // Circular Ats Score and Resume summary card
    scoreSection: {
        alignItems: 'center',
        marginBottom: 18,
    },

    scoreCircle: {
        width: 190,
        height: 190,
        borderRadius: 95,
        borderWidth: 10,
        borderColor: '#DDE1EC',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },

    summaryCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
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

    summaryTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#172033',
        marginBottom: 10,
    },

    summaryText: {
        fontSize: 14,
        color: '#5F6678',
        lineHeight: 22,
    },

    // Keyword Match Card and Missing Skills Card
    keywordCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
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

    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#172033',
        marginBottom: 14,
    },

    keywordProgressTrack: {
        height: 14,
        backgroundColor: '#E9ECF5',
        borderRadius: 999,
        overflow: 'hidden',
    },

    keywordProgressFill: {
        width: '0%',
        height: '100%',
        backgroundColor: '#5B5FEF',
        borderRadius: 999,
    },

    keywordPercentage: {
        fontSize: 16,
        fontWeight: '800',
        color: '#172033',
        marginTop: 12,
    },

    keywordDescription: {
        fontSize: 13,
        color: '#7A8194',
        marginTop: 6,
        lineHeight: 19,
    },

    skillsCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
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

    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },

    skillChip: {
        backgroundColor: '#F1F1FF',
        borderWidth: 1,
        borderColor: '#CFCBFF',
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },

    skillChipText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#5B5FEF',
    },

    //Improvement Suggestions Card
    suggestionsCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
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

    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },

    suggestionText: {
        flex: 1,
        fontSize: 14,
        color: '#3E4658',
        lineHeight: 21,
        marginLeft: 10,
    },

    // Re-analyze button and footer
    reanalyzeButton: {
        marginHorizontal: 20,
        marginTop: 4,
        marginBottom: 14,
        height: 54,
        borderRadius: 14,
        backgroundColor: '#5B5FEF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#5B5FEF',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },

    reanalyzeButtonText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.7,
    },

    footerText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#7A8194',
        marginBottom: 24,
    },
});

export default ATSScoreTab;