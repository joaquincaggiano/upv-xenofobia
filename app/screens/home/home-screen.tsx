import React, {FC, useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, spacing} from '../../theme';
import {NavigatorParamList, forceUpdateAppStack} from '../../navigators';
import {AppCard, Screen, Text} from '../../components';
import RNBootSplash from 'react-native-bootsplash';
import {TxKeyPath, i18n, setLocale} from '../../i18n';
import {useStores} from '../../models';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ChevronDown from '../../../assets/icons/chevron-down.svg';
import UPV from '../../../assets/UPV/home/upv.svg';

const IMG_SIZE = 100;

const LANGS = {
  es: 'CAS',
  ca: 'VAL',
  en: 'ENG',
};

interface itemsHome {
  titleTx: TxKeyPath;
  onPress: () => void;
  imgSrc: ImageSourcePropType;
}

export const HomeScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'home'>
> = observer(({navigation}) => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const insets = useSafeAreaInsets();
  const {appData} = useStores();
  const appStyle = getAppStyle();

  const textStyles = {
    menu: {
      ...appStyle.poppins.regular,
      ...appStyle.textBlue,
      ...appStyle.textXS,
    },
    titleHome1: {
      ...appStyle.poppins.medium,
      ...appStyle.textL,
      ...appStyle.textBlue,
    },
    titleHome2: {
      ...appStyle.poppins.medium,
      ...appStyle.textL,
      ...appStyle.textOrange,
    },
    combatThe: {
      ...appStyle.textBlue,
      ...appStyle.poppins.medium,
      ...appStyle.textXS,
    },
    racism: {
      ...appStyle.textOrange,
      ...appStyle.poppins.medium,
      ...appStyle.textXS,
    },
  };

  const items: itemsHome[] = [
    {
      titleTx: 'homeScreen.whatIs',
      onPress: () => navigation.navigate('whatIs'),
      imgSrc: require('../../../assets/UPV/home/whatIs.png'),
    },
    {
      titleTx: 'homeScreen.comunicate',
      onPress: () => navigation.navigate('comunicate'),
      imgSrc: require('../../../assets/UPV/home/upv.svg'),
    },
    {
      titleTx: 'homeScreen.knowMore',
      onPress: () => navigation.navigate('knowMore'),
      imgSrc: require('../../../assets/UPV/home/knowMore.jpg'),
    },
    {
      titleTx: 'homeScreen.vocabulary',
      onPress: () => navigation.navigate('glossary'),
      imgSrc: require('../../../assets/UPV/home/vocabulary.jpg'),
    },
    {
      titleTx: 'homeScreen.game',
      onPress: () => navigation.navigate('game'),
      imgSrc: require('../../../assets/UPV/home/game.jpg'),
    },
  ];

  const changeLocale = (leng: string) => {
    switch (leng) {
      case 'VAL':
        setLocale('ca');
        appData.setLocale('ca');
        break;
      case 'CAS':
        setLocale('es');
        appData.setLocale('es');
        break;
      case 'ENG':
        setLocale('en');
        appData.setLocale('en');
        break;

      default:
        setLocale('es');
        appData.setLocale('es');
        break;
    }
    forceUpdateAppStack();
  };

  const showLanguages = () => {
    switch (i18n.locale) {
      case 'es':
        return (
          <View>
            <Pressable
              style={({pressed}) => ({
                opacity: pressed ? 0.6 : 1,
                marginBottom: Platform.OS === 'android' ? spacing.xxsmall : 11,
              })}
              onPress={() => {
                changeLocale('VAL');
                setOpenModal(false);
              }}>
              <Text style={textStyles.menu}>VAL</Text>
            </Pressable>

            <Pressable
              style={({pressed}) => ({opacity: pressed ? 0.6 : 1})}
              onPress={() => {
                changeLocale('ENG');
                setOpenModal(false);
              }}>
              <Text style={textStyles.menu}>ENG</Text>
            </Pressable>
          </View>
        );
      case 'ca':
        return (
          <View>
            <Pressable
              style={({pressed}) => ({
                opacity: pressed ? 0.6 : 1,
                marginBottom: Platform.OS === 'android' ? spacing.xxsmall : 11,
              })}
              onPress={() => {
                changeLocale('CAS');
                setOpenModal(false);
              }}>
              <Text style={textStyles.menu}>CAS</Text>
            </Pressable>

            <Pressable
              style={({pressed}) => ({opacity: pressed ? 0.6 : 1})}
              onPress={() => {
                changeLocale('ENG');
                setOpenModal(false);
              }}>
              <Text style={textStyles.menu}>ENG</Text>
            </Pressable>
          </View>
        );
      case 'en':
        return (
          <View>
            <Pressable
              style={({pressed}) => ({
                opacity: pressed ? 0.6 : 1,
                marginBottom: Platform.OS === 'android' ? spacing.xxsmall : 11,
              })}
              onPress={() => {
                changeLocale('VAL');
                setOpenModal(false);
              }}>
              <Text style={textStyles.menu}>VAL</Text>
            </Pressable>

            <Pressable
              style={({pressed}) => ({opacity: pressed ? 0.6 : 1})}
              onPress={() => {
                changeLocale('CAS');
                setOpenModal(false);
              }}>
              <Text style={textStyles.menu}>CAS</Text>
            </Pressable>
          </View>
        );
      default:
        return (
          <View>
            <Pressable
              style={({pressed}) => ({
                opacity: pressed ? 0.6 : 1,
                marginBottom: Platform.OS === 'android' ? spacing.xxsmall : 11,
              })}
              onPress={() => {
                changeLocale('ENG');
                setOpenModal(false);
              }}>
              <Text style={textStyles.menu}>ENG</Text>
            </Pressable>

            <Pressable
              style={({pressed}) => ({opacity: pressed ? 0.6 : 1})}
              onPress={() => {
                changeLocale('CAS');
                setOpenModal(false);
              }}>
              <Text style={textStyles.menu}>CAS</Text>
            </Pressable>
          </View>
        );
    }
  };

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[
        appStyle.screen,
        insets.top > 0 && {paddingTop: spacing.xsmall + insets.top},
      ]}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={require('../../../assets/icon.png')}
          style={{width: 111, height: 49, right: 8}}
        />
        <View style={{flex: 1}} />

        <Pressable
          onPress={() => setOpenModal(!openModal)}
          style={({pressed}) => ({
            opacity: pressed ? 0.6 : 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: spacing.xsmall,
          })}>
          <ChevronDown width={26} height={26} style={{right: 0}} />

          <Text style={{...textStyles.menu, top: 1}}>
            {LANGS[appData.locale as 'es' | 'ca' | 'en']}
          </Text>
        </Pressable>
      </View>

      {/* TITLE: ESTAMOS CONTIGO */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: spacing.large,
        }}>
        <Text style={{...textStyles.titleHome1}} tx="homeScreen.weAre" />
        <Text> </Text>
        <Text style={{...textStyles.titleHome2}} tx="homeScreen.withYou" />
      </View>

      {/* MODAL */}
      {openModal && (
        <View
          style={{
            position: 'absolute',
            top: Platform.OS === 'android' ? 60 : 110,
            left: '91.5%',
            borderRadius: 15,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: spacing.small,
            paddingVertical: spacing.xsmall,
            justifyContent: 'center',
            alignItems: 'center',

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          {showLanguages()}
        </View>
      )}

      {/* CARDS */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {items.map(item => (
          <AppCard
            key={item.titleTx}
            onPress={item.onPress}
            style={{
              paddingVertical: spacing.medium,
              paddingHorizontal: spacing.xxlarge,
              marginBottom: spacing.xlarge,
              justifyContent: 'center',
              alignItems: 'center',
              width: 168,
              borderRadius: 20,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              aspectRatio: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              {item.titleTx === 'homeScreen.comunicate' ? (
                <View
                  style={{
                    width: IMG_SIZE,
                    height: IMG_SIZE,
                    borderRadius: IMG_SIZE,
                    backgroundColor: '#CC5450',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <UPV />
                </View>
              ) : (
                <View>
                  <Image
                    source={item.imgSrc}
                    style={{
                      width: IMG_SIZE,
                      height: IMG_SIZE,
                      borderRadius: IMG_SIZE,
                    }}
                  />
                </View>
              )}
              <View
                style={{
                  marginTop:
                    item.titleTx === 'homeScreen.comunicate' &&
                    (i18n.locale === 'ca' || i18n.locale === 'en')
                      ? spacing.xsmall
                      : spacing.medium,
                }}>
                <Text
                  style={{
                    ...textStyles.combatThe,
                    textAlign: 'center',
                    fontSize: 10.5,
                  }}
                  tx={item.titleTx}
                />
              </View>
            </View>
          </AppCard>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{rotate: '5deg'}],
            right: i18n.locale === 'en' ? 44 : 20,
          }}>
          <Text style={textStyles.racism}>#</Text>
          <Text style={textStyles.combatThe} tx="homeScreen.combatThe" />
          <Text style={textStyles.racism} tx="homeScreen.racism" />
        </View>
      </View>

      {/* FOOTER */}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          bottom: Platform.OS === 'android' ? -12 : 0,
          marginTop: spacing.medium,
        }}>
        <Image
          source={require('../../../assets/UPV/marca_UPV.png')}
          style={{width: 148.905, height: 45}}
        />
      </View>
    </Screen>
  );
});
