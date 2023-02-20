import * as React from 'react';

import { StyleSheet, Pressable } from 'react-native';
import { Text, View, Icon } from '@components/Themed';

import { CategoryType } from '@customTypes/category'

type CategoryItemProps = CategoryType & {
  onPress?: (arg0: CategoryType) => void
}

const CategoryItem = ({ icon, type, color, text, onPress = ()=>{}}: CategoryItemProps) => {
  
  const handlePress = () => {
    onPress({ icon, type, color, text })
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        marginTop: 8,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderColor: color,
        borderWidth: 2,
        maxWidth: 130
      }
    }>
    <Icon
      name={icon}
      size={30}
      color={color}
      type={type}
    />
    <Text style={{
      marginLeft: 8,
      color
    }}>{text}</Text>
  </Pressable>

  );
}

export default CategoryItem;