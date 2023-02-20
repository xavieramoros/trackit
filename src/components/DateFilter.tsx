import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Button, View } from '@components/Themed';

export const FILTER_CONFIG = {
  today: {
    id: 'today',
    text: 'Today',
    days: 1
  },
  // yesterday: {
  //   id: 'yesterday',
  //   text: 'Yesterday',
  //   days: 1
  // },
  lastWeek: {
    id: 'lastWeek',
    text: 'Last week',
    days: 7
  },
  lastMonth: {
    id: 'lastMonth',
    text: 'Last month',
    days: 30
  }
}


type DateFilterProps = {
  onDateSelected: (arg0: string) => void
}

const DateFilter = ({ onDateSelected }: DateFilterProps ) => {
  const [dateFilter, setDateFilter] = useState(FILTER_CONFIG.today.id)

  const handleRenderItem = ({ item }) => (
    <Button
      buttonStyle={{
        backgroundColor: item.id === dateFilter ? "white" : "#007c85",
        borderWidth: 1,
        borderColor: item.id === dateFilter ? "#007c85" : "white",
        borderRadius: 30,
      }}
      containerStyle={{
        marginRight: 8
      }}
      titleStyle={{
        fontWeight: 'bold',
        color: item.id === dateFilter ? "#007c85" : "white",
      }}
      title={item.text}
      onPress={() => {
        setDateFilter(item.id)
        onDateSelected(item.id)
      }}
  />)


  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        renderItem={handleRenderItem}
        data={Object.values(FILTER_CONFIG)}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
    marginRight: 8,
    borderRadius: 100,
    backgroundColor: 'red'
  },
  buttonContainer : {

  }
})

export default DateFilter;