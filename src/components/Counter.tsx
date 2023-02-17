import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { addSeconds } from 'date-fns'

import { Button, Icon } from '@components/Themed';
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
  initialCount?: number
}

const Counter = ({ onStop = () => {}, onPlay = () => {}, onPause = () => {}, initialCount = 0}: CounterProps) => {
  const [count, setCount] = useState(initialCount);
  const [state, setState] = useState<CounterState>('initial');
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
          <Button
            icon={<Icon name="play-circle" type="font-awesome" color="white" />}
            onPress={startCount}
          />
        )}
        {state === 'playing' && (
          <>
            <Button
              icon={<Icon name="pause-circle" type="font-awesome" color="white" />}
              onPress={pauseCount}
            />
            <Button
                containerStyle={styles.marginLeft}
                icon={<Icon name="stop-circle" type="font-awesome" color="white" />}
                onPress={stopCount}
            />
          </>
        )}
        {state === 'paused' && (
          <>
            <Button
              icon={<Icon name="play-circle" type="font-awesome" color="white" />}
              onPress={startCount}
            />
            <Button
              containerStyle={styles.marginLeft}
              icon={<Icon name="stop-circle" type="font-awesome" color="white" />}
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
    marginLeft: 8
  }
});

export default Counter;
