import React, {FC} from 'react';
import {Image, Platform, TextStyle, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, paletteApp, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {Screen, Text} from '../../components';
import {observer} from 'mobx-react-lite';
import { i18n } from '../../i18n';

export const GameScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'game'>
> = observer(({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    header: {
      ...appStyle.poppins.medium,
      ...appStyle.textBlue,
      ...appStyle.textL,
      textAlign: 'center',
    } as TextStyle,
    description: {
      ...appStyle.poppins.medium,
      ...appStyle.textBlue,
      ...appStyle.textL,
      textAlign: 'center',
      lineHeight: 20,
    } as TextStyle,
    button: {
      ...appStyle.poppins.medium,
      ...appStyle.secondaryTextColor,
      ...appStyle.textM,
    },
  };

  const onPressPlay = () => {
    navigation.navigate('gamePlay');
  };

  const showImgXenofobia = () => {
    switch (i18n.locale) {
      case 'es':
        return (
          <Image
            source={require('../../../assets/UPV/stopXenofobiaCas.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        );
      case 'ca':
        return (
          <Image
            source={require('../../../assets/UPV/stopXenofobiaVal.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        );
      case 'en':
        return (
          <Image
            source={require('../../../assets/UPV/stopXenofobiaEng.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        );
      default:
        return (
          <Image
            source={require('../../../assets/UPV/stopXenofobiaCas.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        );
    }
  };

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={appStyle.screen}>
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', marginTop: spacing.xxhuge}}>
          <Text tx="gameScreen.header" style={textStyles.header} />
        </View>

        <View style={{alignItems: 'center', marginTop: spacing.xxlarge}}>
          <Text tx="gameScreen.description" style={textStyles.description} />
        </View>

        <View style={{marginVertical: spacing.xxhuge}}>
          <TouchableOpacity
            onPress={onPressPlay}
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
              tx="gameScreen.play"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '66%',
            alignSelf: 'center',
            aspectRatio: 1,
            bottom: 20,
          }}>
          {showImgXenofobia()}
        </View>
      </View>
    </Screen>
  );
});
