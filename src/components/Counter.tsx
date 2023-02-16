import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button, Icon } from '@components/Themed';


type CounterState = 'initial' | 'playing' | 'paused';

type CounterProps = {
  onPlay?: () => void,
  onPause?: ()=> void,
  onStop?: ()=> void,
}

const Counter = ({ onStop = () => {}, onPlay = () => {}, onPause = () => {}}: CounterProps) => {
  const [count, setCount] = useState(new Date(0));
  const [state, setState] = useState<CounterState>('initial');
  const intervalRef = useRef<NodeJS.Timeout>();

  const startCount = () => {
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => new Date(prevCount.getTime() + 1000));
    }, 1000);

    setState('playing');
    onPlay();
  };

  const pauseCount = () => {
    clearInterval(intervalRef.current);
    setState('paused');
    onPause()
  };

  const stopCount = () => {
    clearInterval(intervalRef.current);
    setCount(new Date(0));
    setState('initial');
    onStop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {count.toISOString().substr(11, 8)}
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
          <Button
            icon={<Icon name="pause-circle" type="font-awesome" color="white" />}
            onPress={pauseCount}
          />
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
