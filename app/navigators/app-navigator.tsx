import React, { useReducer } from 'react';
import { Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ComunicateScreen,
  HomeScreen,
  KnowMoreScreen,
  GlossaryScreen,
  WhatIsScreen,
  GameScreen,
  GameOverScreen,
  GamePlayScreen,
  GameWord,
} from '../screens';
import { navigationRef } from './navigation-utilities';
import { translate } from '../i18n';
import { light } from '../theme';
import BackIcon from '../../assets/icons/chevron-left.svg';

export type NavigatorParamList = {
  home: undefined;
  whatIs: undefined;
  comunicate: undefined;
  knowMore: undefined;
  glossary: undefined;
  game: undefined;
  gamePlay: undefined;
  gameOver: { words: GameWord[] };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends NavigatorParamList {}
  }
}

const Stack = createNativeStackNavigator<NavigatorParamList>();

export let forceUpdateAppStack: () => void = () => {};

const AppStack = () => {
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  forceUpdateAppStack = forceUpdate; // changeLanguage
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTintColor: light.mainTextColor.color, //iOS
        headerTitleStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 16.75,
          ...light.textBlue,
        },
        headerStyle: {
          backgroundColor: light.screen.backgroundColor,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        animation: Platform.OS === 'ios' ? 'default' : 'fade', // https://github.com/react-navigation/react-navigation/issues/11438
        headerLeft: () => (
          <Pressable
            onPress={() => navigationRef.current?.goBack()}
            style={({ pressed }) => ({
              marginLeft: -6,
              opacity: pressed ? 0.6 : 1,
              paddingRight: 15,
              paddingVertical: 3,
            })}
          >
            <BackIcon width={24} height={24} />
          </Pressable>
        ),
        contentStyle: {
          backgroundColor: light.screen.backgroundColor,
        },
      }}
      initialRouteName="home"
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="whatIs"
        component={WhatIsScreen}
        options={{ title: translate('whatIsScreen.title') }}
      />
      <Stack.Screen
        name="comunicate"
        component={ComunicateScreen}
        options={{ title: translate('comunicateScreen.title') }}
      />
      <Stack.Screen
        name="knowMore"
        component={KnowMoreScreen}
        options={{ title: translate('knowMoreScreen.title') }}
      />
      <Stack.Screen
        name="glossary"
        component={GlossaryScreen}
        options={{ title: translate('glossaryScreen.title') }}
      />
      <Stack.Screen
        name="game"
        component={GameScreen}
        options={{ title: translate('gameScreen.title') }}
      />
      <Stack.Screen
        name="gameOver"
        component={GameOverScreen}
        options={{ title: translate('gameOverScreen.title') }}
      />
      <Stack.Screen
        name="gamePlay"
        component={GamePlayScreen}
        options={{ title: translate('gamePlayScreen.title') }}
      />
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';
