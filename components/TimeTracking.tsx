import * as React from 'react';

import { View } from 'react-native';
import { ThemeProvider, createTheme, useTheme } from '@rneui/themed';

import { Icon , Button } from './Themed'

const TimeTracking = () => {
  const handlePress = () => {

  }

  return <View>
      <Icon
        name='play-arrow'
        onPress={handlePress}/>
    </View>
}

export default TimeTracking;