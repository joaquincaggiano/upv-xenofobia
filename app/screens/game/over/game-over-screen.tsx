import React, {FC, useEffect} from 'react';
import {Image, View, TouchableOpacity, Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, paletteApp, spacing} from '../../../theme';
import {NavigatorParamList} from '../../../navigators';
import {AppCard, Screen, Text} from '../../../components';

export const GameOverScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'gameOver'>
> = ({navigation, route}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    header: {
      ...appStyle.poppins.medium,
      ...appStyle.textBlue,
      ...appStyle.textL,
    },
    results: {
      ...appStyle.poppins.medium,
      ...appStyle.secondaryTextColor,
      ...appStyle.textXXXL,
    },
    results2: {
      ...appStyle.poppins.medium,
      ...appStyle.secondaryTextColor,
      ...appStyle.textL,
    },
    button: {
      ...appStyle.poppins.medium,
      ...appStyle.secondaryTextColor,
      ...appStyle.textM,
    },
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
    });
  }, []);

  const onPressExit = () => {
    navigation.navigate('home');
  };

  const getResult = () => {
    const words = route.params?.words || [];
    let correctCounter = 0;
    for (let i = 0; i < words.length; i++) {
      if (words[i].correctBoolean) {
        correctCounter++;
      }
    }
    return correctCounter + '/' + words.length;
  };

  return (
    <Screen
      preset="fixed"
      backgroundColor={appStyle.screen.backgroundColor}
      style={appStyle.screen}>
      <AppCard
        disabled={true}
        style={{
          marginTop: spacing.xhuge,
          borderRadius: 20,
          paddingVertical: 0,
          paddingLeft: 0,
          paddingRight: 0,
          overflow: 'hidden',
          width: '100%',
          aspectRatio: 2.2,
        }}>
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
          <Image
            source={require('../../../../assets/UPV/gameOver.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.35)',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={textStyles.results} text={getResult()} />
          <Text style={textStyles.results2} tx={'gameOverScreen.results'} />
        </View>
      </AppCard>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: spacing.xxhuge,
          marginBottom: 100,
        }}>
        <Text style={textStyles.header} tx="gameOverScreen.thanks" />
      </View>

      <View
        style={{
          marginVertical: spacing.small,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={onPressExit}
          activeOpacity={0.7}
          style={{
            width: 210,
            borderRadius: 50,
            paddingHorizontal: spacing.medium,
            paddingVertical: spacing.small,
            backgroundColor: paletteApp.blue,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...textStyles.button,
              top: Platform.OS === 'android' ? 1.2 : 0,
            }}
            tx="gameOverScreen.exit"
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};
