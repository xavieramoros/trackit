import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text, View, Button } from '@components/Themed';
import ActivityItem from '@components/ActivityItem';

import { ActivityType } from '@customTypes/activity';

type ActivityListProps = {
  list: ActivityType[],
  onDelete: (id: string) => void
}

const ActivityList = ({ list, onDelete }:ActivityListProps) => {
  const handleRenderItem = ({item}) => <ActivityItem {...item} onDelete={onDelete}/>

  const navigation = useNavigation();
  const handleGoToTrack = () => {
    navigation.navigate('Root', { screen: 'Home' });

  }
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={list}
        renderItem={handleRenderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.text}>You don't have any tracked activity yet. </Text>
            <Button onPress={handleGoToTrack} title="Start tracking"></Button>
          </View>
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  listContainer: {
    flex:1,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    // fontWeight: 'bold'
  }
});

export default ActivityList;