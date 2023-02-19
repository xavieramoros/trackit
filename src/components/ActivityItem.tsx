import * as React from 'react';
import { formatRelative } from 'date-fns'
import { StyleSheet } from 'react-native';

import { Text, View, Button, Icon } from '@components/Themed';
import { ActivityType } from '@customTypes/activity';
import { convertSecondsToFullTime } from '@utils/time';
import CategoryItem from '@components/CategoryItem';

type ActivityItemProps = ActivityType & {
  onDelete: (id: string) => void
}

const ActivityItem = ({ id, startTimestamp, endTimestamp, count, category, onDelete }: ActivityItemProps) => {

  const handleDelete = () => {
    onDelete(id);
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1}}>
        <View style={styles.firstRow}>
          <CategoryItem {...category}/>
          <Text style={styles.totalTime}>Total time: <Text style={styles.count}>{convertSecondsToFullTime(count)}</Text></Text>
        </View>
        <View>
          <Text>{formatRelative(endTimestamp, new Date())}</Text>
        </View>
      </View>
      <View style={styles.delete}>
        <Icon onPress={handleDelete} name="delete"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingRight: 8
  },
  totalTime: {
    marginLeft: 8,
    fontSize: 20,
  },
  count: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold'
  },
  delete: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ActivityItem;