import * as React from 'react';

import { StyleSheet } from 'react-native';
import { Text, View, Button, Icon } from '@components/Themed';
import { ActivityType } from '@customTypes/activity';
import { convertSecondsToFullTime } from '@utils/time';

type ActivityItemProps = ActivityType & {
  onDelete: (id: string) => void
}

const ActivityItem = ({ id, startTimestamp, endTimestamp, count, category, onDelete }: ActivityItemProps) => {

  const handleDelete = () => {
    onDelete(id);
  }
  return (
    <View style={styles.container}>
      <Text>Start time: {startTimestamp}</Text>
      <Text>End: {endTimestamp}</Text>
      <Text>Category: {category}</Text>
      <Text>Total time: {convertSecondsToFullTime(count)}</Text>
      <Icon onPress={handleDelete} name="delete"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  }
})

export default ActivityItem;