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


const TabOneScreen = ({ navigation }: RootTabScreenProps<'TabOne'>) => {

  const dispatch = useDispatch()
  const initialCount = useSelector(getCounterState)
  const counterState = useSelector(getCounterCount)

  console.log('initialCount:',initialCount);
  console.log('CounterState:',counterState);

  const handleStop = ({ state, count}) => {
    console.log('handleStop:', state, count);
    dispatch(trackingFinished({ state, count }));
  }

  const handlePlay = ({ state }) => {
    console.log('handlePlay:', state);
    dispatch(trackingStarted({ state }));
  }

  const handlePause = ({ count, state }) => {
    console.log('handlePause:', state, count);
    dispatch(trackingPaused({ state, count }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracking</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Counter onPlay={handlePlay} onPause={handlePause} onStop={handleStop}
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

export default  TabOneScreen;