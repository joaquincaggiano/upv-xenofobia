import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { View, Linking } from 'react-native';
import { NavigatorParamList } from '../../navigators';
import { observer } from 'mobx-react-lite';
import { getAppStyle, spacing } from '../../theme';
import { AppCard, Screen, Text } from '../../components';
import { TxKeyPath, i18n } from '../../i18n';
import LinkLogo from '../../../assets/icons/open-outline.svg';

interface itemsKnowMore {
  title: TxKeyPath;
  url: string;
}

export const KnowMoreScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'knowMore'>
> = observer(({ navigation }) => {
  const appStyle = getAppStyle();

  const textStyles = {
    title: {
      ...appStyle.textBlue,
      ...appStyle.poppins.medium,
      ...appStyle.textM,
    },
  };

  const items: itemsKnowMore[] = [
    {
      title: 'knowMoreScreen.subtitle1',
      url: 'https://riunet.upv.es/collections/911543c6-52b4-4cb8-acca-6b8035e6cf56',
    },
    {
      title: 'knowMoreScreen.subtitle2',
      url: 'https://podcast.upv.es/programa/tiempo-gitano/',
    },
    {
      title: 'knowMoreScreen.subtitle3',
      url:
        i18n.locale === 'ca'
          ? 'https://www.igualdad.gob.es/wp-content/uploads/Medios-graficos-faldon_Musulmana_246x106_VALEN-scaled.jpg'
          : 'https://www.igualdad.gob.es/comunicacion/campanas/mirar-con-distinta-cara-es-racismo-021-contra-el-racismo-no-mires-hacia-otro-lado/',
    },
    {
      title: 'knowMoreScreen.subtitle4',
      url:
        i18n.locale === 'ca'
          ? 'https://inclusio.gva.es/va/web/igualdad-diversidad/igualat'
          : 'https://inclusio.gva.es/es/web/igualdad-diversidad/igualat',
    },
    {
      title: 'knowMoreScreen.subtitle5',
      url: 'https://igualdadynodiscriminacion.igualdad.gob.es/home.do',
    },
    {
      title: 'knowMoreScreen.subtitle6',
      url: 'https://www.inclusion.gob.es/oberaxe/es/index.htm',
    },
    {
      title: 'knowMoreScreen.subtitle7',
      url: 'https://alertcops.ses.mir.es/publico/alertcops/',
    },
    {
      title: 'knowMoreScreen.subtitle8',
      url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-11589',
    },
  ];

  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={appStyle.screen}
    >
      {items.map(item => {
        return (
          <AppCard
            onPress={() => openURL(item.url)}
            key={item.title}
            style={{
              flexDirection: 'row',
              borderRadius: 20,
              paddingVertical: spacing.large,
              paddingRight: spacing.xxlarge,
              paddingLeft: spacing.large,
              backgroundColor: 'white',
              marginBottom: spacing.xlarge,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            }}
          >
            <LinkLogo
              width={30}
              height={30}
              style={{ marginRight: spacing.medium }}
            />
            <View style={{ width: 248 }}>
              <Text tx={item.title} style={textStyles.title} />
            </View>
          </AppCard>
        );
      })}
    </Screen>
  );
});
