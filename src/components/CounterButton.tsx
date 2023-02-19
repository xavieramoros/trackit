import * as React from 'react';

import { Button, Icon } from '@components/Themed';
import { View, Text, StyleSheet } from 'react-native';

const config = {
  play: {
    text: 'Play',
    icon: 'play'
  },
  pause: {
    text: 'Pause',
    icon: 'pause'
  },
  stop: {
    text: 'Stop',
    icon: 'stop'
  },
}

type CounterButtonProps = {
  onPress: () => void,
  type: 'play' | 'stop' | 'pause',
  style?: object
}


const CounterButton = ({ type, onPress, style = {} }: CounterButtonProps) => {
  return (
    <View style={[styles.container, style]}>
      <Button
        type="clear"
        buttonStyle={{
          backgroundColor: 'transparent',
        }}
        icon={<Icon size={30} name={config[type].icon} type="font-awesome" color="black" />}
        onPress={onPress}
      />
      <Text style={styles.text}>{ config[type].text }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 4,
    fontSize: 16
  }
})


export default CounterButton;