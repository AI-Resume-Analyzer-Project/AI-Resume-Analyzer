import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useState } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

function RecruiterHomeTab() {

    const [jdType, setJdType] = useState('existing')

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <>
                        {/* Header */}
                        <View style={styles.header}>

                            <View style={styles.logoContainer}>
                                <View style={styles.logoCircle}>
                                    <Text style={styles.headerIcon}>👥</Text>
                                </View>
                            </View>

                            <Text style={styles.title}>
                                AI Resume Analyzer
                            </Text>

                            <Text style={styles.subtitle}>
                                Analyze multiple resumes{"\n"}
                                against a Job Description
                            </Text>

                        </View>

                        {/* Floating Card */}
                        <View style={styles.analysisCard}>

                            <Text style={styles.analysisTitle}>
                                Bulk Resume Analysis
                            </Text>

                            <Text style={styles.analysisSubtitle}>
                                Upload resumes and compare{"\n"}
                                them with a Job Description.
                            </Text>
                        </View>

                        {/* Job Discription */}
                        <View style={styles.jdSection}>
                            <Text style={styles.sectionTitle}>Job Description</Text>

                            <View style={styles.selectJdBox}>
                                <Text style={styles.selectJdLabel}>Select Existing JD</Text>

                                <TouchableOpacity
                                    style={styles.selectJdDropdown}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        // TODO:
                                        // Open existing JD list here
                                    }}
                                >
                                    <Text style={styles.selectJdDropdownText}>
                                        {/* TODO:
                                            Show selected JD title here from backend/state
                                        */}
                                        Select an existing JD
                                    </Text>

                                    <Ionicons name="chevron-down-outline" size={18} color="#6F7687" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.jdOptionalSection}>
                                <Text style={styles.inputLabel}>
                                    Paste / Type JD <Text style={styles.optionalText}>(Optional)</Text>
                                </Text>

                                <View>
                                    {/* TODO:
                                        Add JD input field here
                                        Save JD text in state
                                        Use this JD if recruiter types or pastes one instead of selecting an existing JD
                                    */}
                                    <TextInput
                                        mode="outlined"
                                        placeholder="Paste the job description here..."
                                        multiline
                                        numberOfLines={10}
                                        style={styles.jdInput}
                                        outlineColor="#DDE1EC"
                                        activeOutlineColor="#5B5FEF"
                                        placeholderTextColor="#8A90A6"
                                    // TODO:
                                    // Add JD state here
                                    // Send JD text to analysis API later
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Upload Resume */}
                        <View style={styles.uploadSection}>
                            <View style={styles.uploadBox}>
                                <View style={styles.uploadIconCircle}>
                                    <Text style={styles.uploadIcon}>☁</Text>
                                </View>

                                <Text style={styles.uploadTitle}>Upload Candidate Resumes</Text>

                                <Text style={styles.uploadText}>
                                    Browse Files
                                </Text>

                                <Text style={styles.fileTypes}>PDF • DOC • DOCX</Text>

                                <TouchableOpacity
                                    style={styles.browseButton}
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        // TODO:
                                        // Allow multiple file upload
                                        // Open document picker here
                                    }}
                                >
                                    <Text style={styles.browseButtonText}>SELECT RESUME FILES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Selected Resumes */}
                        <View style={styles.selectedResumesCard}>
                            <Text style={styles.sectionTitle}>Selected Resumes</Text>

                            {/* TODO:
                                Render selected resumes here from state/backend
                                Example:
                                selectedResumes.map((resume) => (
                                    <View key={resume.id} style={styles.selectedResumeRow}>
                                    ...
                                    </View>
                                ))
                            */}

                            {/* TODO:
                                Show "+ more" text here if more resumes are selected than can be displayed
                            */}
                        </View>

                        {/* Analyze Button */}
                        <TouchableOpacity
                            style={styles.analyzeButton}
                            activeOpacity={0.85}
                            onPress={() => {
                                // TODO:
                                // Validate JD
                                // Validate uploaded resumes
                                // Upload files
                                // Call ranking API
                                // Navigate to Ranking Tab
                            }}
                        >
                            <Text style={styles.analyzeButtonText}>ANALYZE ALL RESUMES</Text>
                        </TouchableOpacity>

                        <Text style={styles.supportedFormatsTitle}>Supported formats</Text>

                        <Text style={styles.supportedFormatsText}>
                            PDF • DOC • DOCX{"\n"}
                            Maximum Size : 5 MB
                        </Text>
                    </>
                }
            />
        </SafeAreaView>
    )
}

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

    headerIcon: {
        fontSize: 36,
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

    analysisCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -30,
        marginBottom: 20,
        borderRadius: 22,
        padding: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },

    analysisTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#172033',
        marginBottom: 8,
    },

    analysisSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 22,
    },

    // Job Discription
    jdSection: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
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

    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#172033',
        marginBottom: 14,
    },

    selectJdBox: {
        marginBottom: 16,
    },

    selectJdLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#3E4658',
        marginBottom: 10,
    },

    selectJdDropdown: {
        height: 52,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#DDE1EC',
        backgroundColor: '#F8F9FD',
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    selectJdDropdownText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#172033',
        flex: 1,
        marginRight: 10,
    },

    jdOptionalSection: {
        marginTop: 2,
    },

    inputLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#3E4658',
        marginBottom: 10,
    },

    optionalText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#7A8194',
    },

    jdInput: {
        backgroundColor: '#F8F9FD',
        borderRadius: 18,
        minHeight: 120,
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 14,
    },

    // Upload Resume
    uploadSection: {
        marginHorizontal: 20,
        marginBottom: 16,
    },

    uploadBox: {
        backgroundColor: '#F8F7FF',
        borderWidth: 1.5,
        borderColor: '#CFCBFF',
        borderStyle: 'dashed',
        borderRadius: 22,
        paddingVertical: 26,
        paddingHorizontal: 18,
        alignItems: 'center',
    },

    uploadIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 22,
        backgroundColor: '#EEF0FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },

    uploadIcon: {
        fontSize: 34,
        color: '#5B5FEF',
    },

    uploadTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#172033',
        textAlign: 'center',
    },

    uploadText: {
        fontSize: 14,
        color: '#5F6678',
        textAlign: 'center',
        lineHeight: 21,
        marginTop: 10,
    },

    fileTypes: {
        fontSize: 12,
        fontWeight: '700',
        color: '#7A8194',
        marginTop: 10,
        marginBottom: 18,
        letterSpacing: 0.4,
    },

    browseButton: {
        width: '100%',
        height: 52,
        borderRadius: 14,
        backgroundColor: '#5B5FEF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#5B5FEF',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
        elevation: 5,
    },

    browseButtonText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.6,
    },

    // Selected Resumes
    selectedResumesCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
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

    // Analyze Button
    analyzeButton: {
        marginHorizontal: 20,
        marginTop: 6,
        marginBottom: 14,
        height: 54,
        borderRadius: 14,
        backgroundColor: '#5B5FEF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#5B5FEF',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },

    analyzeButtonText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 0.7,
    },

    supportedFormatsTitle: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '700',
        color: '#3E4658',
        marginTop: 8,
    },

    supportedFormatsText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#7A8194',
        lineHeight: 18,
        marginTop: 6,
    },
})

export default RecruiterHomeTab;