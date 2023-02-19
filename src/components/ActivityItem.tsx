import * as React from 'react';

import { StyleSheet } from 'react-native';
import { Text, View, Button } from '@components/Themed';
import { ActivityType } from '@customTypes/activity';
import { convertSecondsToFullTime } from '@utils/time';

type ActivityItemProps = ActivityType & {
  onDelete: (id: number) => void
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