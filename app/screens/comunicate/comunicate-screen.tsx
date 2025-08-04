import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {Linking, View} from 'react-native';
import {NavigatorParamList} from '../../navigators';
import {observer} from 'mobx-react-lite';
import {getAppStyle, spacing} from '../../theme';
import {Screen, Text} from '../../components';
import {TxKeyPath, i18n, translate} from '../../i18n';

interface itemsComunicate {
  title: TxKeyPath;
  descriptionTitle: TxKeyPath;
  url1: string;
  descriptionTitle2?: TxKeyPath;
  descriptionTitle2_part2?: TxKeyPath;
  url2?: string;
  conector1?: TxKeyPath;
  conector2?: TxKeyPath;
  conector3?: TxKeyPath;
}

export const ComunicateScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'comunicate'>
> = observer(({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    question: {
      ...appStyle.textBlue,
      ...appStyle.poppins.medium,
      ...appStyle.textM,
    },
    title: {
      ...appStyle.textOrange,
      ...appStyle.poppins.medium,
      ...appStyle.textS,
    },
    descriptionBody: {
      ...appStyle.textBlue,
      ...appStyle.poppins.regular,
      ...appStyle.textS,
    },
  };

  const items: itemsComunicate[] = [
    {
      title: 'comunicateScreen.subTitle1',
      descriptionTitle: 'comunicateScreen.subTitle1_body1',
      url1:
        i18n.locale === 'ca'
          ? 'https://www.upv.es/organizacion/escuelas-facultades/index-va.html'
          : 'https://www.upv.es/organizacion/escuelas-facultades/index-es.html',
      descriptionTitle2: 'comunicateScreen.subTitle1_body2',
      descriptionTitle2_part2: 'comunicateScreen.subTitle1_body2_part2',
      url2:
        i18n.locale === 'ca'
          ? 'https://www.upv.es/estudios/posgrado/index-va.html'
          : 'https://www.upv.es/estudios/posgrado/index-es.html',
      conector1: 'comunicateScreen.conector1',
    },
    {
      title: 'comunicateScreen.subTitle2',
      descriptionTitle: 'comunicateScreen.subTitle2_body1',
      url1: 'igualdad@upv.es',
      descriptionTitle2: 'comunicateScreen.subTitle2_body2',
      url2:
        i18n.locale === 'ca'
          ? 'https://www.upv.es/entidades/vacts/va/inici/'
          : 'https://www.upv.es/entidades/vacts/',
      conector1: 'comunicateScreen.conector7',
    },
    {
      title: 'comunicateScreen.subTitle3',
      descriptionTitle: 'comunicateScreen.subTitle3_body1',
      url1:
        i18n.locale === 'ca'
          ? 'https://www.upv.es/entidades/vee/va/inici/'
          : 'https://www.upv.es/entidades/vee/',
      conector1: 'comunicateScreen.conector7',
    },
    {
      title: 'comunicateScreen.subTitle4',
      descriptionTitle: 'comunicateScreen.subTitle4_body1',
      url1:
        i18n.locale === 'ca'
          ? 'https://www.upv.es/entidades/dcu/va/inici-ca/'
          : 'https://www.upv.es/entidades/DCU/index-es.html',
      descriptionTitle2: 'comunicateScreen.subTitle4_body2',
      conector1: 'comunicateScreen.conector5',
      conector2: 'comunicateScreen.conector6',
      conector3: 'comunicateScreen.conector7',
    },
    {
      title: 'comunicateScreen.subTitle5',
      descriptionTitle: 'comunicateScreen.subTitle5_body1',
      url1: i18n.locale === 'ca' ? 'https://daupv.es/vl/' : 'https://daupv.es/',
      conector1: 'comunicateScreen.conector2',
      conector2: 'comunicateScreen.conector7',
    },
  ];

  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={appStyle.screen}>
      <View>
        <Text tx="comunicateScreen.question" style={textStyles.question} />
      </View>

      <View style={{marginTop: spacing.large}}>
        {items.map(item => {
          return (
            <View key={item.title} style={{marginBottom: spacing.medium}}>
              {/* Títulos */}
              <Text tx={item.title} style={textStyles.title} />

              {/* Jefatura de estudios... */}
              {item.title === 'comunicateScreen.subTitle1' && (
                <View>
                  <Text
                    style={{
                      ...textStyles.descriptionBody,
                      marginBottom: spacing.medium,
                    }}>
                    {translate(item.descriptionTitle)}
                    <Text> </Text>
                    <Text
                      onPress={() => openURL(item.url1)}
                      style={{
                        ...textStyles.descriptionBody,
                        textDecorationLine: 'underline',
                      }}
                      tx={item.conector1}
                    />
                  </Text>

                  {i18n.locale === 'en' ? (
                    <Text style={textStyles.descriptionBody}>
                      {translate(item.descriptionTitle2!)}
                      <Text> </Text>
                      <Text
                        style={textStyles.descriptionBody}
                        tx={item.descriptionTitle2_part2}
                      />
                      <Text> </Text>
                      <Text
                        onPress={() => openURL(item.url2!)}
                        style={{
                          ...textStyles.descriptionBody,
                          textDecorationLine: 'underline',
                        }}
                        tx={item.conector1}
                      />
                    </Text>
                  ) : (
                    <Text style={textStyles.descriptionBody}>
                      {translate(item.descriptionTitle2!)}
                      <Text> </Text>
                      <Text
                        onPress={() => openURL(item.url2!)}
                        style={{
                          ...textStyles.descriptionBody,
                          textDecorationLine: 'underline',
                        }}
                        tx={item.conector1}
                      />
                    </Text>
                  )}
                </View>
              )}

              {/* Vicerrectorado de Arte... */}
              {item.title === 'comunicateScreen.subTitle2' && (
                <View>
                  <Text
                    style={{
                      ...textStyles.descriptionBody,
                      marginBottom: spacing.medium,
                    }}>
                    {translate(item.descriptionTitle)}
                    <Text> </Text>
                    <Text
                      onPress={() => Linking.openURL(`mailto:${item.url1}`)}
                      style={{
                        ...textStyles.descriptionBody,
                        textDecorationLine: 'underline',
                      }}
                      text={item.url1}
                    />
                  </Text>

                  <Text
                    style={{
                      ...textStyles.descriptionBody,
                    }}>
                    {translate(item.descriptionTitle2!)}
                    <Text> </Text>
                    <Text
                      onPress={() => openURL(item.url2!)}
                      style={{
                        ...textStyles.descriptionBody,
                        textDecorationLine: 'underline',
                      }}
                      tx={item.conector1}
                    />
                  </Text>
                </View>
              )}

              {/* Vicerrectorado de Estudiantes */}
              {item.title === 'comunicateScreen.subTitle3' && (
                <Text
                  style={{
                    ...textStyles.descriptionBody,
                  }}>
                  {translate(item.descriptionTitle)}
                  <Text> </Text>
                  <Text
                    onPress={() => openURL(item.url1)}
                    style={{
                      ...textStyles.descriptionBody,
                      textDecorationLine: 'underline',
                    }}
                    tx={item.conector1}
                  />
                </Text>
              )}

              {/* Defensoría universitaria */}
              {item.title === 'comunicateScreen.subTitle4' &&
                (i18n.locale === 'en' ? (
                  <Text
                    style={{
                      ...textStyles.descriptionBody,
                    }}>
                    {translate(item.conector1!)}
                    <Text> </Text>
                    <Text
                      onPress={() => openURL(item.url1)}
                      style={{
                        ...textStyles.descriptionBody,
                        textDecorationLine: 'underline',
                      }}
                      tx={item.conector2}
                    />
                    <Text> </Text>
                    <Text
                      style={textStyles.descriptionBody}
                      tx={item.descriptionTitle}
                    />
                    <Text> </Text>
                    <Text
                      style={textStyles.descriptionBody}
                      tx={item.descriptionTitle2}
                    />
                  </Text>
                ) : (
                  <Text
                    style={{
                      ...textStyles.descriptionBody,
                    }}>
                    {translate(item.descriptionTitle)}
                    <Text> </Text>
                    <Text
                      onPress={() => openURL(item.url1)}
                      style={{
                        ...textStyles.descriptionBody,
                        textDecorationLine: 'underline',
                      }}
                      tx={item.conector3}
                    />
                  </Text>
                ))}

              {/* Delegación de estudiantes */}
              {item.title === 'comunicateScreen.subTitle5' && (
                <View>
                  <Text
                    style={{
                      ...textStyles.descriptionBody,
                    }}>
                    {translate(item.descriptionTitle)}
                    <Text> </Text>
                    <Text
                      onPress={() => openURL(item.url1)}
                      style={{
                        ...textStyles.descriptionBody,
                        textDecorationLine: 'underline',
                      }}
                      tx={
                        i18n.locale === 'en' ? item.conector2 : item.conector1
                      }
                    />
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </Screen>
  );
});
