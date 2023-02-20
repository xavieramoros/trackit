import { useState, useMemo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'
import { differenceInDays } from 'date-fns'

import { Text, View, Icon } from '@components/Themed';
import DateFilter, { FILTER_CONFIG } from '@components/DateFilter';
import { getActivityList, getCategories } from '@data/selectors';
import { ActivityType } from '@customTypes/activity';
import { convertSecondsToTime } from '@utils/time';

const StatisticsScreen = () => {
  const activityList = useSelector(getActivityList);
  const categories = useSelector(getCategories);
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

  const hoursByCategory = useMemo( () => {
    const hoursBy = filteredActivities.reduce((acc: object, activity: ActivityType) => {
    const categoryText = activity?.category?.text;
    acc[categoryText] = (acc[categoryText] || 0) + activity.count;
    return acc;
  }, {});
    return Object.entries(hoursBy).sort((a, b) => b[1] - a[1]);
  }, [filteredActivities]);

  return (
    <View style={styles.container}>
      <DateFilter onDateSelected={handleDateSelected}/>
      <ScrollView>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Text style={styles.title}>Total hours </Text>
            <Text style={styles.contentText}>{totalHours} hours</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>Unique categories </Text>
            <Text style={styles.contentText}>{uniqueCategories.length} categories</Text>
          </View>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Text style={styles.title}>Category stats </Text>
        {hoursByCategory.map( (item) => {
            const [category, countInSeconds] = item;
            const maxCountInSeconds = hoursByCategory[0][1];
            const calculateWith = countInSeconds * 100 / maxCountInSeconds;

            const categoryFound = categories.find( ({ text })=> text === category)
            const { type, color, icon } = categoryFound;
            return (
              <View style={styles.categoryContainer}>
                <View style={styles.categoryRow1}>
                  <View style={styles.categoryTitleBox}>
                    <Icon
                      name={icon}
                      size={30}
                      color={color}
                      type={type}
                    />
                    <Text style={[styles.contentText, styles.categoryStatsTitle]}>{item[0]}</Text>
                  </View>
                  <View style={styles.categoryTime}>
                    { convertSecondsToTime(countInSeconds).hours !== "00" ? <Text style={styles.categoryStatsHours}>{convertSecondsToTime(countInSeconds).hours}h</Text>:null}
                    { convertSecondsToTime(countInSeconds).minutes !== "00" ? <Text style={styles.categoryStatsHours}>{convertSecondsToTime(countInSeconds).minutes}m</Text>:null}
                    { convertSecondsToTime(countInSeconds).seconds !== "00" ? <Text style={styles.categoryStatsHours}>{convertSecondsToTime(countInSeconds).seconds}s</Text>:null}
                  </View>
                </View>
                <View style={styles.categoryBarBox}>
                    <View style={styles.categoryBar}/>
                    <View style={[styles.categoryBar, { position: 'absolute', backgroundColor: color, width: `${calculateWith}%`} ]}/>
                </View>
              </View>
            )
            })}
          </ScrollView>
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
  categoryContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 4
  },
  categoryRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4
  },
  categoryTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryStatsTitle: {
    marginLeft: 8
  },
  categoryTime: {
    flexDirection: 'row'
  },
  categoryBarBox: {
    marginTop: 4
  },
  categoryBar: {
    borderRadius: 4,
    height: 10,
    backgroundColor: 'grey',
    width: '100%'
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