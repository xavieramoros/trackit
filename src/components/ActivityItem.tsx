import * as React from 'react';

import { StyleSheet } from 'react-native';
import { Text, View, Button } from '@components/Themed';

const ActivityItem = ({ startTimestamp, endTimestamp, count, category }) => {
  return (
    <View style={styles.container}>
      <Text>Start: {startTimestamp}</Text>
      <Text>End: {endTimestamp}</Text>
      <Text>Category: {startTimestamp}</Text>
      <Text>Total time: {count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginVertical: 4,
    marginHorizontal: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  }
})

export default ActivityItem;