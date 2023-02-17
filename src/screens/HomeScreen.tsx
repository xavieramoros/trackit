import { StyleSheet } from 'react-native';

import { Text, View } from '@components/Themed';
import Counter from '@components/Counter';
import { RootTabScreenProps } from '@customTypes/index';
import { useSelector, useDispatch } from 'react-redux'

import {
  trackingFinished,
  trackingStarted,
  trackingPaused
} from '@data/activitySlice'

import {
  getCounterState,
  getCounterCount
} from '@data/selectors'


const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {

  const dispatch = useDispatch()
  const counterState = useSelector(getCounterState)
  const initialTimestamp = useSelector(getCounterCount)

  console.log('initialTimestamp:',initialTimestamp);
  console.log('initialTimestamp in date:', initialTimestamp ? new Date(initialTimestamp): new Date());
  //TODO: calculate the time diference
  console.log('CounterState:',counterState);

  const handleStop = ({ state, count}) => {
    console.log('handleStop:', state, count);
    dispatch(trackingFinished({ state, count: count.valueOf() }));
  }

  const handlePlay = ({ state }) => {
    console.log('handlePlay:', state);
    dispatch(trackingStarted({ state }));
  }

  const handlePause = ({ count, state }) => {
    console.log('handlePause:', state, count);
    dispatch(trackingPaused({ state, count: count.valueOf() }));
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tracking</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <Counter onPlay={handlePlay} onPause={handlePause} onStop={handleStop} initialTimestamp={initialTimestamp}
      />
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

export default  HomeScreen;