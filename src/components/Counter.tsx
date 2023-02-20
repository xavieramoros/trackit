import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { differenceInSeconds } from 'date-fns'

import CounterButton from '@components/CounterButton';
import { convertSecondsToTime } from '@utils/time';

type CounterState = 'initial' | 'playing' | 'paused';

type callbackPayload = {
  state: CounterState,
  count: number
}

type CounterProps = {
  onPlay?: ({ state } : { state: CounterState}) => void,
  onPause?: ({ count, state} : callbackPayload) => void,
  onStop?: ({ count, state} : callbackPayload) => void,
  initialTimestamp?: number,
  initialState?: CounterState
}

const Counter = ({ onStop = () => {}, onPlay = () => {}, onPause = () => {}, initialTimestamp, initialState = 'initial'}: CounterProps) => {

  const [count, setCount] = useState<number>(0);

  useEffect(()=> {
    if(initialTimestamp){
      const initialCount = differenceInSeconds(new Date(), new Date(initialTimestamp));
      setCount(initialCount);

      if(initialState === 'playing'){
        startCount()
      }
    }
  }, [])

  const [state, setState] = useState<CounterState>(initialState);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startCount = () => {
    intervalRef.current = setInterval(() => {
      setCount((prevCount: number) => prevCount + 1);
    }, 1000);

    setState('playing');
    onPlay({ state: 'playing'});
  };

  const pauseCount = () => {
    clearInterval(intervalRef.current);
    setState('paused');
    onPause({ count, state: 'paused' })
  };

  const stopCount = () => {
    clearInterval(intervalRef.current);
    onStop({ count, state: 'initial' });
    setCount(0);
    setState('initial');
  };

  const { hours, minutes, seconds } =  convertSecondsToTime(count)

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          { `${hours}:${minutes}:${seconds}`}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {state === 'initial' && (
          <CounterButton
            type="play"
            onPress={startCount}
          />
        )}
        {state === 'playing' && (
          <>
            <CounterButton
              type="pause"
              onPress={pauseCount}
            />
            <CounterButton
              style={styles.marginLeft}
              type="stop"
              onPress={stopCount}
            />
          </>
        )}
        {state === 'paused' && (
          <>
            <CounterButton
              type="play"
              onPress={startCount}
            />
            <CounterButton
              style={styles.marginLeft}
              type="stop"
              onPress={stopCount}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    marginBottom: 20,
  },
  countText: {
    fontSize: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  marginLeft: {
    marginLeft: 20
  },
});

export default Counter;
