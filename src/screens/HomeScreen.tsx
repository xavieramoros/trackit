import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';

import { View } from '@components/Themed';
import { Dialog } from '@rneui/themed';
import Counter from '@components/Counter';
import CategorySelection from '@components/CategorySelection';
import { RootTabScreenProps } from '@customTypes/index';

import {
  trackingFinished,
  trackingStarted,
  trackingPaused,
  addCategoryToLatestActivity
} from '@data/activitySlice'

import {
  getCounterState,
  getCounterCount,
  getCategories
} from '@data/selectors'

import { CategoryType } from '@customTypes/category';

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {

  const dispatch = useDispatch()
  const counterState = useSelector(getCounterState)
  const categories = useSelector(getCategories)
  const initialTimestamp = useSelector(getCounterCount)
  const [categoryDialogVisible, setCategoryDialogVisible] = useState(false)

  const handleStop = ({ state, count}) => {
    dispatch(trackingFinished({ state, count: count.valueOf() }));
    setCategoryDialogVisible(true)
  }

  const handlePlay = ({ state }) => {
    dispatch(trackingStarted({ state }));
  }

  const handlePause = ({ count, state }) => {
    dispatch(trackingPaused({ state, count: count.valueOf() }));
  }

  const handleCloseDialog = () => {
    setCategoryDialogVisible(false)
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: 'Your activity has been saved!',
      position: 'bottom',
      bottomOffset: 100
    });
  }

  const handleCategorySelected = (category: CategoryType) => {
    console.log('category:', category);
    dispatch(addCategoryToLatestActivity(category))
    handleCloseDialog()
    showToast()
  }

  return (
    <View style={styles.container}>
      <Counter 
        onPlay={handlePlay} 
        onPause={handlePause} 
        onStop={handleStop} 
        initialTimestamp={initialTimestamp}
      />
      <Dialog
        isVisible={categoryDialogVisible}
        //onBackdropPress={handleCloseDialog}
      >
        <Dialog.Title title="Select category"/>
        <CategorySelection categories={categories} onCategorySelected={handleCategorySelected}/>
      </Dialog>
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