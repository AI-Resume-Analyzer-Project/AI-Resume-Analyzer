import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message'
import AppScreen from './src/screens/AppScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppScreen/>
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
});
