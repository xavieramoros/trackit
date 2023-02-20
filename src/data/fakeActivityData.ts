const ONE_DAY = 86400000; // number of milliseconds in one day
const TWO_WEEKS = ONE_DAY * 14; // number of milliseconds in two weeks

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const NUMBER_OF_FAKE_ACTIVITIES = 30;
const AVAILABLE_CATEGORIES = [
  {
    text: 'Meetings',
    color: 'blue',
    icon: 'groups',
    type: 'material'
  },
  {
    text: 'Shopping',
    color: 'purple',
    icon: 'shopping-cart',
    type: 'material'
  },
  {
    text: 'Study',
    color: 'green',
    icon: 'school',
    type: 'material'
  },
  {
    text: 'Workout',
    color: 'red',
    icon: 'heart',
    type: 'material-community'
  },
  {
    text: 'Cooking',
    color: 'orange',
    icon: 'fastfood',
    type: 'material'
  },
  {
    text: 'Travel',
    color: 'brown',
    icon: 'airport-shuttle',
    type: 'material'
  }];

export const generateFakeActivity = () => {
  const activities = [];
  for (let i = 0; i < NUMBER_OF_FAKE_ACTIVITIES; i++) {
    const endTimestamp = Date.now() - getRandomInt(0, TWO_WEEKS); // endTimestamp is a random date in the past two weeks
    const startTimestamp = endTimestamp - getRandomInt(0, TWO_WEEKS); // startTimestamp is also a random date in the past two weeks
    const id = String(endTimestamp); // id is the same as endTimestamp
    const count = getRandomInt(60, 7200); // count is a random number between 60 and 7200
    const category = AVAILABLE_CATEGORIES[Math.floor(Math.random()*AVAILABLE_CATEGORIES.length)];

    activities.push({ count, id, startTimestamp, endTimestamp, category });
  }

  return activities;
}
