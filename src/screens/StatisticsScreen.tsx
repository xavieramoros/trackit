import { StyleSheet } from 'react-native';

import { Text, View } from '@components/Themed';

const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
        <View style={styles.totalTrackedTime}><Text>10 hours</Text></View>
      </View>
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
  totalTrackedTime: {
    borderRadius: 8,
    borderWith: 1,
    borderColor: '#CCC'
  }
});

export default StatisticsScreen;