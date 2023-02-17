import * as React from 'react';

import { StyleSheet, FlatList } from 'react-native';

import { Text, View, Button } from '@components/Themed';
import ActivityItem from '@components/ActivityItem';

const ActivityList = ({ list }) => {
  const handleRenderItem = ({item}) => <ActivityItem {...item} />

  console.log('##### list:',list);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={list}
        renderItem={handleRenderItem}
        keyExtractor={item => item.startTimestamp}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column'
  }
});

export default ActivityList;