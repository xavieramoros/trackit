import { StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View, Button } from '@components/Themed';

import { useDispatch } from 'react-redux'
import {
  addFakeActivityData
} from '@data/activitySlice'


const SettingsScreen = () => {
  const dispatch = useDispatch();
  const handleAddFakeData = () => {
    dispatch(addFakeActivityData())
  }
  return (
    <View style={styles.container}>
        <Button
          title='Clear AsyncStorage'
          onPress={() => {
            Platform.OS === 'android' ? AsyncStorage.clear() : AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
          }}
        />
        <Button
          style={styles.margin}
          title='Add fake activity Data'
          onPress={handleAddFakeData}
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
  margin: {
    marginTop: 8
  }
});

export default SettingsScreen;