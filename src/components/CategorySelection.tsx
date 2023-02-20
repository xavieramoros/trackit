import * as React from 'react';

import { StyleSheet } from 'react-native';
import { View, Button, Icon } from '@components/Themed';
import CategoryItem from '@components//CategoryItem';

import { CategoryType } from '@customTypes/category'

type CategorySelectionProps = {
  categories: CategoryType[],
  onCategorySelected: () => void
}

const CategorySelection = ({ categories, onCategorySelected }: CategorySelectionProps) => {

  const handleAddCategory = () => {
    //TODO: add handling of adding categories
  }

  return (
    <View style={styles.container}>
        { categories.map(({ icon, color, text, type }) => (
          <View key={text} style={styles.categoryWrapper}>
            <CategoryItem
              icon={icon}
              color={color}
              text={text}
              type={type}
              onPress={onCategorySelected}
            />
          </View>
        ))
      }
      <Button
        title='Add category'
        type='clear'
        titleStyle={{
          color: 'black',
          marginLeft: 4
        }}
        buttonStyle={{
          backgroundColor: 'transparent',
        }}
        icon={<Icon size={20} name="plus" type="font-awesome" color="black" />}
        onPress={handleAddCategory}
      />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  categoryWrapper: {
    marginLeft: 4
  }
})

export default CategorySelection;