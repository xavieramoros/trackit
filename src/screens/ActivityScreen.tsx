import { StyleSheet } from 'react-native';

import { Text, View } from '@components/Themed';

import { useSelector, useDispatch } from 'react-redux'

import { getActivityList } from '@data/selectors';

import ActivityList from '@components/ActivityList';

const ActivityScreen = () => {
  const activityList = useSelector(getActivityList);
  return (
    <View style={styles.container}>
      <ActivityList list={activityList}/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
});

export default ActivityScreen;