import React, {FC, useMemo, useRef, useState} from 'react';
import {FlatList, Linking, Platform, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, paletteApp, spacing} from '../../theme';
import {NavigatorParamList} from '../../navigators';
import {Screen, Text, TextField} from '../../components';
import {i18n} from '../../i18n';
import SearchIcon from '../../../assets/icons/searchOrange.svg';
import es from '../../i18n/locales/es.json';
import en from '../../i18n/locales/en.json';
import ca from '../../i18n/locales/ca.json';
import {observer} from 'mobx-react-lite';

type GlossaryWords = {
  title: string;
  desc: string;
  law?: string;
};

type FlatListRenderItemProps = {
  item: GlossaryWords;
  index: number;
};

const getLocaleWords = () => {
  if (i18n.locale === 'es') {
    return es.glossaryWords;
  }
  if (i18n.locale === 'ca') {
    return ca.glossaryWords;
  }
  return en.glossaryWords;
};

const URL = "https://www.boe.es/buscar/act.php?id=BOE-A-2022-11589"

export const GlossaryScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'glossary'>
> = observer(({navigation}) => {
  const flatlistRef = React.useRef<FlatList>(null);

  // const getWordsArraySorted = () => {
  //   /*const storageWords = load(`glossaryWords-${i18n.locale}`)
  //   if(storageWords) {
  //     return storageWords
  //   }*/
  //   const wordsSorted = getLocaleWords().sort((a, b) =>
  //     a.title.localeCompare(b.title),
  //   );
  //   //save(`glossaryWords-${i18n.locale}`, wordsSorted)
  //   return wordsSorted;
  // };

  const words = useRef<GlossaryWords[]>(getLocaleWords());
  const [filter, setFilter] = useState('');
  const [selectedWord, setSelectedWord] = useState<GlossaryWords>();

  const filteredWords = useMemo(() => {
    if (filter?.length > 0) {
      const regex = new RegExp(
        filter.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        'gi',
      );
      return words.current.filter(word =>
        word.title
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .match(regex),
      );
    }
    return words.current;
  }, [filter]);

  const appStyle = getAppStyle();

  const textStyles = {
    input: {
      ...appStyle.poppins.medium,
      ...appStyle.mainTextColor,
      ...appStyle.textS,
    },
    word: {
      ...appStyle.poppins.medium,
      ...appStyle.textOrange,
      ...appStyle.textM,
    },
    wordDescription: {
      ...appStyle.poppins.regular,
      ...appStyle.textBlue,
      ...appStyle.textS,
    },
    sourceText: {
      ...appStyle.poppins.regular,
      ...appStyle.mainTextColor,
      ...appStyle.textXS,
    },
  };

  const renderItem = ({item, index}: FlatListRenderItemProps) => {
    const selected = selectedWord?.title === item.title;
    const isLastItem = index === filteredWords.length - 1;
    return (
      <Pressable
        style={{
          marginBottom: isLastItem ? 25 : 0,
          paddingHorizontal: spacing.medium,
          paddingVertical: spacing.medium,
          backgroundColor:
            index % 2 === 0 ? appStyle.mainColor : paletteApp.white,
        }}
        onPress={() => setSelectedWord(selected ? undefined : item)}>
        <Text text={item.title} style={textStyles.word} />

        {selected && (
          <View
            style={{
              marginTop: spacing.xsmall,
            }}>
            <Text style={textStyles.wordDescription}>
              {item.desc}
              <Text
                onPress={() => Linking.openURL(URL)}
                style={{
                  ...textStyles.wordDescription,
                  textDecorationLine: 'underline',
                }}>
                {item.law}
              </Text>
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <Screen
      preset="fixed"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[appStyle.screen, {paddingHorizontal: 0}]}>
      <View style={{flexDirection: 'row', paddingHorizontal: spacing.medium}}>
        <TextField
          placeholderTx="glossaryScreen.search"
          placeholderTextColor={paletteApp.blue}
          style={{
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            paddingRight: 0,
            width: 'auto',
            flex: 1,
            paddingVertical:
              Platform.OS === 'ios' ? spacing.xsmall : spacing.xxsmall,
            backgroundColor: paletteApp.white,
          }}
          onChangeText={setFilter}
        />
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: paletteApp.white,
            borderBottomRightRadius: spacing.xsmall,
            borderTopRightRadius: spacing.xsmall,
            paddingHorizontal: spacing.xxsmall,
          }}>
          <SearchIcon width={23} height={23} />
        </View>
      </View>

      <View
        style={{marginTop: spacing.xxlarge}}>
        <FlatList
          ref={flatlistRef}
          keyboardShouldPersistTaps={'never'}
          showsVerticalScrollIndicator={false}
          data={filteredWords}
          keyExtractor={item => item.title}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          }}
        />
      </View>
    </Screen>
  );
});
