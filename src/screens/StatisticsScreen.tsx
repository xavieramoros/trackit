import { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'
import { differenceInDays } from 'date-fns'

import { Text, View } from '@components/Themed';
import DateFilter, { FILTER_CONFIG } from '@components/DateFilter';
import { getActivityList } from '@data/selectors';
import { ActivityType } from '@customTypes/activity'

const StatisticsScreen = () => {
  const activityList = useSelector(getActivityList);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_CONFIG.today.id);

  const handleDateSelected = (newFilter: string) => {
    setSelectedFilter(newFilter)
  }

  const filteredActivities = useMemo(() => activityList.filter( ({ endTimestamp })=> {
    const difference = differenceInDays(new Date(), new Date(endTimestamp));
    return difference < FILTER_CONFIG[selectedFilter].days
  }), [activityList, selectedFilter]);

  const totalSeconds = useMemo( () => filteredActivities.reduce( (acc : number, activity: ActivityType)=> acc + activity.count, 0),[filteredActivities]);
  const totalHours = (totalSeconds/3600).toFixed(2);;

  const uniqueCategories = useMemo(() => {
    const categories = filteredActivities.map( (activity : ActivityType) => activity?.category?.text);
    return Array.from(new Set(categories));
  }, [filteredActivities,]);

  console.log('filteredActivities:',filteredActivities);

  const hoursByCategory = useMemo( () => {
    const hoursBy = filteredActivities.reduce((acc: object, activity: ActivityType) => {
    const categoryText = activity?.category?.text;
    acc[categoryText] = (acc[categoryText] || 0) + activity.count;
    return acc;
  }, {});
  return hoursBy;
  }, [filteredActivities]);

  return (
    <View style={styles.container}>
      <DateFilter onDateSelected={handleDateSelected}/>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.title}>Total hours </Text>
          <Text style={styles.contentText}>{totalHours} hours</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Unique categories </Text>
          <Text style={styles.contentText}>{uniqueCategories.length} categories</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Longest task </Text>
          <Text style={styles.contentText}>Some random task</Text>
          <Text style={styles.contentText}>3,3 hours</Text>
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.title}>Category stats </Text>
      {Object.entries(hoursByCategory).map( ([category, countInSeconds]) => (
        <View style={styles.categoryStats}>
          <Text style={[styles.contentText, styles.categoryStatsTitle]}>{category}</Text>
          <View style={styles.categoryBar}/>
          <Text style={styles.categoryStatsHours}>{countInSeconds}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'flex-start',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 16,
  },
  contentText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  totalTime: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  box: {
    marginRight: 8,
    width: '45%',
    marginTop: 8,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'grey'
  },
  categoryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryStatsTitle: {
    marginTop: 4
  },
  categoryStatsHours : {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

});

export default StatisticsScreen;