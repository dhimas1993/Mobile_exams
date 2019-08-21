import React, { Component } from 'react'
import {Icon} from 'native-base'
import {Provider} from 'react-redux'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'

import AuthScreen from './src/auth/AuthScreen'

import DiaryScreen from './src/app/DiaryScreen'
import AddDiaryScreen from './src/app/AddDiaryScreen'
import DetailDiaryScreen from './src/app/DetailDiaryScreen'

import ProfileScreen from './src/app/ProfileScreen'


import STORE from './src/store/reducers/index'

const DiaryStack = createStackNavigator(
  {
    ListDiary: DiaryScreen,
    AddDiary: AddDiaryScreen,
    DetailDiary: DetailDiaryScreen
  },
  {
    headerMode: 'none'
  }
)

const MainTab = createBottomTabNavigator(
  {
    Diary: {
      screen: DiaryStack,
      navigationOptions: {
        tabBarIcon: <Icon name='bookmarks'/>
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: <Icon name='contact'/>
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'purple',
      inactiveTintColor: 'grey'
    }
  }
)

const RootStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Main: MainTab
  },
  {
    headerMode: 'none'
  }
)

const AppContainer = createAppContainer(RootStack)

class App extends Component {
  render (){
    return (
      <Provider store={STORE}>
        <AppContainer/>
      </Provider>
    )
  }
}


export default App