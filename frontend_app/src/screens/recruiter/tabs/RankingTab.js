import React from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

function RankingTab() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoCircle}>
                                    <Ionicons name="trophy-outline" size={34} color="#FFFFFF" />
                                </View>
                            </View>

                            <Text style={styles.title}>Rankings</Text>

                            <Text style={styles.subtitle}>
                                Rank the uploaded resumes
                            </Text>
                        </View>

                        {/* JD Summary card */}
                        <View style={styles.selectedJdCard}>
                            <View style={styles.selectedJdTopRow}>
                                <View style={styles.selectedJdLeft}>
                                    <Ionicons name="document-text-outline" size={22} color="#5B5FEF" />
                                    <Text style={styles.selectedJdTitle}>
                                        {/* TODO:
                                            Show selected JD title here from backend/state
                                            Example: Java Developer
                                        */}
                                    </Text>
                                </View>

                                <Text style={styles.selectedJdCount}>
                                    {/* TODO:
                                        Show total uploaded resumes count here
                                        Example: 24 resumes
                                    */}
                                </Text>
                            </View>

                            <View style={styles.selectedJdDivider} />

                            <View style={styles.selectedJdBottom}>
                                <Text style={styles.selectedJdSummaryLabel}>
                                    {/* TODO:
                                        Show ranking summary label here later
                                        Example: Highest ATS Score
                                    */}
                                </Text>

                                <Text style={styles.selectedJdSummaryValue}>
                                    {/* TODO:
                                        Show ranking summary value here later
                                        Example: 91%
                                    */}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>Ranked Candidates</Text>

                        {/* Ranking Card */}
                        <View style={styles.rankingCard}>
                            <View style={styles.rankingCardTop}>
                                <View style={styles.rankLeft}>
                                    <View style={styles.rankCircle}>
                                        <Text style={styles.rankText}>
                                            {/* TODO:
                                                Show rank number here
                                                Example: #1
                                            */}
                                        </Text>
                                    </View>

                                    <View style={styles.resumeInfo}>
                                        <Text style={styles.resumeName}>
                                            {/* TODO:
                                                Show resume name here from backend/state
                                            */}
                                        </Text>

                                        <Text style={styles.resumeStatus}>
                                            {/* TODO:
                                                Show short ranking status here
                                                Example: Strong match / Good match / Average match
                                            */}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.scoreBadge}>
                                    <Text style={styles.scoreBadgeText}>
                                        {/* TODO:
                                            Show ATS score here from backend/state
                                            Example: 91%
                                        */}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyIcon}>🏆</Text>

                                <Text style={styles.emptyTitle}>
                                    No rankings available
                                </Text>

                                <Text style={styles.emptySubtitle}>
                                    Select a Job Description and{"\n"}
                                    analyze resumes to generate rankings.
                                </Text>
                            </View>
                        }
                    </>
                }
            />
        </SafeAreaView>
    );
}

export default RankingTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FF',
    },

    listContainer: {
        paddingBottom: 40,
    },

    header: {
        backgroundColor: '#5B5FEF',
        height: 240,
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

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 15,
        color: '#E8E8FF',
        textAlign: 'center',
        lineHeight: 22,
    },

    // JD summary card
    selectedJdCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -30,
        marginBottom: 16,
        borderRadius: 22,
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

    selectedJdTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    selectedJdLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    selectedJdTitle: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '800',
        color: '#172033',
        flex: 1,
    },

    selectedJdCount: {
        fontSize: 13,
        fontWeight: '700',
        color: '#5B5FEF',
    },

    selectedJdDivider: {
        height: 1,
        backgroundColor: '#ECECEC',
        marginVertical: 14,
    },

    selectedJdBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    selectedJdSummaryLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#3E4658',
    },

    selectedJdSummaryValue: {
        fontSize: 14,
        fontWeight: '800',
        color: '#172033',
    },

    sectionTitle: {
        marginHorizontal: 20,
        marginBottom: 12,
        fontSize: 18,
        fontWeight: '800',
        color: '#172033',
    },

    // Ranking Card
    getScoreBadgeColor: {
        // TODO:
        // Use this logic inside your component when score data is available:
        //
        // if (score >= 80) return '#22C55E';
        // if (score >= 60) return '#F59E0B';
        // return '#EF4444';
    },

    rankingCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 14,
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },

    rankingCardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    rankLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    rankCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#EEF0FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    rankText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#5B5FEF',
    },

    resumeInfo: {
        flex: 1,
    },

    resumeName: {
        fontSize: 16,
        fontWeight: '800',
        color: '#172033',
    },

    resumeStatus: {
        marginTop: 4,
        fontSize: 13,
        color: '#7A8194',
    },

    scoreBadge: {
        minWidth: 60,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#DDE1EC',
    },

    scoreBadgeText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#FFFFFF',
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 50,
        paddingBottom: 30,
    },

    emptyIcon: {
        fontSize: 68,
        marginBottom: 18,
    },

    emptyTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#172033',
        textAlign: 'center',
    },

    emptySubtitle: {
        marginTop: 10,
        fontSize: 15,
        color: '#7A8194',
        textAlign: 'center',
        lineHeight: 23,
    },
});