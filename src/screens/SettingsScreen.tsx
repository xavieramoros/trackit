import { StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View, Button } from '@components/Themed';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
        <Button
          title='Clear AsyncStorage'
          onPress={() => {
            Platform.OS === 'android' ? AsyncStorage.clear() : AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
