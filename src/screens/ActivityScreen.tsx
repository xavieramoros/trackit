import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';


import { useSelector, useDispatch } from 'react-redux'

import { getActivityList } from '@data/selectors';

import { deleteTracking } from '@data/activitySlice'


import ActivityList from '@components/ActivityList';

const ActivityScreen = () => {
  const activityList = useSelector(getActivityList);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    Alert.alert('Delete', 'Do you really want to delete this activity?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(deleteTracking(id))},
    ]);

  }
  return (
      <ActivityList list={activityList} onDelete={handleDelete}/>
  );
}

const styles = StyleSheet.create({
});

export default ActivityScreen;