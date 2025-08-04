import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useState} from 'react';
import {Linking, Pressable, TouchableOpacity, View} from 'react-native';
import {NavigatorParamList} from '../../navigators';
import {observer} from 'mobx-react-lite';
import {TxKeyPath, translate} from '../../i18n';
import {Screen, Text} from '../../components';
import {getAppStyle, paletteApp} from '../../theme';

import Add from '../../../assets/icons/add.svg';
import Remove from '../../../assets/icons/remove.svg';
import {spacing} from '../../theme/spacing';

interface itemsQuestion {
  questionTx: TxKeyPath;
  answerTx: TxKeyPath;
  id: string;
}

export const WhatIsScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'whatIs'>
> = observer(({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    title: {
      ...appStyle.textBlue,
      ...appStyle.textL,
      ...appStyle.poppins.medium,
    },
    titleActive: {
      ...appStyle.textOrange,
      ...appStyle.textL,
      ...appStyle.poppins.medium,
    },
    answer: {
      ...appStyle.poppins.regular,
      ...appStyle.textBlue,
      ...appStyle.textS,
    },
  };

  const items: itemsQuestion[] = [
    {
      id: '1',
      questionTx: 'whatIsScreen.questions.question1',
      answerTx: 'whatIsScreen.questions.question1_ans',
    },
    {
      id: '2',
      questionTx: 'whatIsScreen.questions.question2',
      answerTx: 'whatIsScreen.questions.question2_ans',
    },
    {
      id: '3',
      questionTx: 'whatIsScreen.questions.question3',
      answerTx: 'whatIsScreen.questions.question3_ans',
    },
    {
      id: '4',
      questionTx: 'whatIsScreen.questions.question4',
      answerTx: 'whatIsScreen.questions.question4_ans',
    },
    {
      id: '5',
      questionTx: 'whatIsScreen.questions.question5',
      answerTx: 'whatIsScreen.questions.question5_ans',
    },
  ];

  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    if (openQuestionId === questionId) {
      setOpenQuestionId(null);
    } else {
      setOpenQuestionId(questionId);
    }
  };

  const selectTelNumber = (text: string) => {
    const regex = /\b\d{3} \d{3} \d{3}\b/g;
    const numeros = text.match(regex);

    const numerosRenderizados = numeros?.map((numero, index) => {
      const numeroLimpio: string = numero.replace(/\s/g, ''); // Elimina los espacios en blanco
      const numeroComoEntero: number = parseInt(numeroLimpio, 10); // Convierte el número en un entero
      return (
        <Text
          key={index}
          onPress={() => Linking.openURL(`tel:${numeroComoEntero}`)}
          style={{textDecorationLine: "underline"}}
        >
          {numero}
        </Text>
      );
    });

    const textoConNumerosPresionables = text
      .split(regex)
      .map((parte, index) => {
        return (
          <Text key={index}>
            {parte}
            {numerosRenderizados && numerosRenderizados[index]}
          </Text>
        );
      });

    return (
      <Text
        style={{
          ...textStyles.answer,
          marginTop: -10,
          marginBottom: spacing.large,
          paddingHorizontal: 15,
        }}>
        {textoConNumerosPresionables}
      </Text>
    );
  };

  return (
    <Screen
      preset="scroll"
      backgroundColor={appStyle.screen.backgroundColor}
      style={[appStyle.screen, {paddingHorizontal: 0}]}>
      {items.map(item => {
        const isOpen = openQuestionId === item.id;
        return (
          <Pressable
            key={item.id}
            onPress={() => toggleQuestion(item.id)}
            style={({pressed}) => ({
              opacity: pressed ? 0.6 : 1,
            })}>
            <View style={{borderBottomWidth: 1, borderColor: paletteApp.white}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: spacing.large,
                  marginTop: item.id === '1' ? 0 : 20,
                  paddingHorizontal: 15,
                }}>
                <Text
                  tx={item.questionTx}
                  style={isOpen ? textStyles.titleActive : textStyles.title}
                />
                {isOpen ? (
                  <Remove width={24} height={24} />
                ) : (
                  <Add width={24} height={24} />
                )}
              </View>
              {isOpen && selectTelNumber(`${translate(item.answerTx)}`)}
            </View>
          </Pressable>
        );
      })}
    </Screen>
  );
});
