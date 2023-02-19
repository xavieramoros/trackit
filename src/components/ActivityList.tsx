import * as React from 'react';

import { StyleSheet, FlatList } from 'react-native';

import { Text, View, Button } from '@components/Themed';
import ActivityItem from '@components/ActivityItem';

import { ActivityType } from '@customTypes/activity';

type ActivityListProps = {
  list: ActivityType[],
  onDelete: (id: number) => void
}

const ActivityList = ({ list, onDelete }:ActivityListProps) => {
  const handleRenderItem = ({item}) => <ActivityItem {...item} onDelete={onDelete}/>

  console.log('##### list:',list);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={list}
        renderItem={handleRenderItem}
        keyExtractor={item => item.id}
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