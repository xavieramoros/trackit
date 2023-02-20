/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

import Colors from '@constants/Colors';
import useColorScheme from '@hooks/useColorScheme';
import ModalScreen from '@screens/ModalScreen';
import NotFoundScreen from '@screens/NotFoundScreen';
import HomeScreen from '@screens/HomeScreen';
import ActivityScreen from '@screens/ActivityScreen';
import StatisticsScreen from '@screens/StatisticsScreen';
import SettingsScreen from '@screens/SettingsScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '@customTypes/index';
import LinkingConfiguration from './LinkingConfiguration';
import { Icon } from '@components/Themed';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
      }}
      text2Style={{
        fontSize: 18,
      }}
    />
  ),

}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <>
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
    <Toast config={toastConfig} />
    </>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} 
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarLabelStyle: { fontSize: 14 },
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Track',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <Icon name="list" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color }) => <Icon name="bar-chart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} />,
        }}
      />

    </BottomTab.Navigator>
  );
}