import React, {FC, useEffect, useState} from 'react';
import {Platform, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getAppStyle, paletteApp, spacing} from '../../../theme';
import {NavigatorParamList} from '../../../navigators';
import {AppCard, AppModal, Screen, Text} from '../../../components';
import {TxKeyPath, i18n} from '../../../i18n';
import es from '../../../i18n/locales/es.json';
import en from '../../../i18n/locales/en.json';
import ca from '../../../i18n/locales/ca.json';

export type GameWord = {
  quiz_p: TxKeyPath;
  quiz_a1: TxKeyPath;
  quiz_a2: TxKeyPath;
  quiz_a3?: TxKeyPath;
  quiz_a4?: TxKeyPath;
  quiz_a5?: TxKeyPath;
  quiz_a6?: TxKeyPath;
  correctAnswer: TxKeyPath;
  correctBoolean?: boolean;
};

const getLocaleWords = () => {
  if (i18n.locale === 'es') {
    return es.gameWords;
  }
  if (i18n.locale === 'ca') {
    return ca.gameWords;
  }
  return en.gameWords;
};

const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const GamePlayScreen: FC<
  NativeStackScreenProps<NavigatorParamList, 'gamePlay'>
> = ({navigation}) => {
  const appStyle = getAppStyle();

  const textStyles = {
    quiz: {
      ...appStyle.secondaryTextColor,
      ...appStyle.textS,
      ...appStyle.poppins.regular,
    },
    answer: {
      ...appStyle.textS,
      ...appStyle.poppins.regular,
      ...appStyle.textBlue,
    },
    next: {
      ...appStyle.textM,
      ...appStyle.poppins.medium,
      ...appStyle.textBlue,
    },
    contador: {
      ...appStyle.textBlue,
      ...appStyle.poppins.regular,
      ...appStyle.textXS,
    },
    modalTexts: {
      ...appStyle.textBlue,
      ...appStyle.poppins.medium,
      ...appStyle.textS,
    },
  };

  const boxesStyle = {
    borderGreen: {
      borderWidth: 2,
      borderColor: '#88D46D',
    },
    borderRed: {
      borderWidth: 2,
      borderColor: '#E44B4B',
    },
    boxNormal: {
      borderWidth: 2,
      borderColor: '#FFF',
      borderRadius: 20,
      minHeight: 68,
      paddingHorizontal: spacing.large,
      paddingVertical: spacing.medium,
      marginBottom: spacing.medium,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
  };

  const [showModal, setShowModal] = useState(false);
  const [words, setWords] = useState<GameWord[]>(deepClone(getLocaleWords()));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [disabledCard, setDisabledCard] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<boolean | null>>(
    [null, null, null, null, null, null],
  );

  useEffect(() => {
    setSelectedAnswers([null, null, null, null, null, null]);
    setDisabledCard(false);
  }, [words[currentWordIndex].quiz_p]);

  useEffect(() => {
    showText();
  }, [selectedAnswers]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={({pressed}) => pressed && {opacity: 0.6}}
          onPress={() => setShowModal(true)}>
          <Text style={textStyles.contador} tx="common.cancel" />
        </Pressable>
      ),
      headerLeft: () => <></>,
    });
  });

  const navigateNextScreen = () => {
    if (currentWordIndex === 9) {
      setCurrentWordIndex(0);
      return navigation.navigate('gameOver', {words});
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const getIndexFromKey = (key: TxKeyPath) => {
    const {quiz_a1, quiz_a2, quiz_a3, quiz_a4, quiz_a5, quiz_a6} =
      words[currentWordIndex];

    if (key === quiz_a1) {
      return 1;
    } else if (key === quiz_a2) {
      return 2;
    } else if (key === quiz_a3) {
      return 3;
    } else if (key === quiz_a4) {
      return 4;
    } else if (key === quiz_a5) {
      return 5;
    } else if (key === quiz_a6) {
      return 6;
    }

    return -1;
  };

  const onCheckAnswer = (textValue: TxKeyPath, index: number) => {
    const isCorrect = textValue === words[currentWordIndex].correctAnswer;
    const indexCorrectAnswer = getIndexFromKey(
      words[currentWordIndex].correctAnswer,
    );

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[index] = isCorrect;

    if (!isCorrect) {
      updatedSelectedAnswers[indexCorrectAnswer - 1] = true;
    }
    const newWords = [...words];
    newWords[currentWordIndex].correctBoolean = isCorrect;
    setWords(newWords);
    setSelectedAnswers(updatedSelectedAnswers);
    setDisabledCard(true);
  };

  const selectStyle = (id: number) => {
    switch (selectedAnswers[id]) {
      case true:
        return {...boxesStyle.boxNormal, ...boxesStyle.borderGreen};
      case false:
        return {...boxesStyle.boxNormal, ...boxesStyle.borderRed};
      default:
        return boxesStyle.boxNormal;
    }
  };

  const showText = (): {text: TxKeyPath; disabledState: boolean} => {
    const thereIsAResponse = selectedAnswers.every(answer => {
      return answer == null;
    });

    if (!thereIsAResponse && currentWordIndex === 9) {
      return {
        text: 'gamePlayScreen.finish',
        disabledState: false,
      };
    }
    if (thereIsAResponse) {
      return {
        text: 'gamePlayScreen.answerToGoOn',
        disabledState: true,
      };
    } else {
      return {
        text: 'gamePlayScreen.next',
        disabledState: false,
      };
    }
  };

  return (
    <>
      <Screen
        preset="scroll"
        backgroundColor={appStyle.screen.backgroundColor}
        style={[appStyle.screen, {paddingHorizontal: 0}]}>
        {/* MODAL DE CANCELAR */}
        <AppModal
          visible={showModal}
          onPressOutside={() => setShowModal(false)}
          backdropOpacity={0.5}>
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: 268,
                backgroundColor: '#FFF',
                borderRadius: 20,
              }}>
              {/* PREGUNTA DE CANCELAR */}
              <View
                style={{
                  paddingHorizontal: spacing.xhuge,
                  paddingVertical: spacing.xlarge,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#87A5AD',
                  // alignItems: 'center',
                }}>
                <Text
                  tx="gamePlayScreen.quitTheGame"
                  style={{
                    ...textStyles.modalTexts,
                    textAlign: 'center',
                    top: Platform.OS === 'android' ? 2 : 0,
                  }}
                />
              </View>

              {/* RESPUESTAS A CANCELAR */}
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: '50%',
                    paddingHorizontal: spacing.large,
                    paddingVertical: spacing.xsmall,
                    borderRightWidth: 0.5,
                    borderRightColor: '#87A5AD',
                  }}>
                  <Pressable
                    onPress={() => setShowModal(false)}
                    style={({pressed}) => pressed && {opacity: 0.6}}>
                    <Text
                      style={{
                        ...textStyles.modalTexts,
                        textAlign: 'center',
                        top: Platform.OS === 'android' ? 2 : 0,
                      }}
                      tx="gamePlayScreen.dontCancel"
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    width: '50%',
                    paddingHorizontal: spacing.large,
                    paddingVertical: spacing.xsmall,
                  }}>
                  <Pressable
                    style={({pressed}) => pressed && {opacity: 0.6}}
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('game');
                    }}>
                    <Text
                      style={{
                        ...textStyles.modalTexts,
                        textAlign: 'center',
                        top: Platform.OS === 'android' ? 2 : 0,
                      }}
                      tx="gamePlayScreen.cancelTheGame"
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </AppModal>

        {/* GAME */}
        <View style={{paddingHorizontal: 15}}>
          {/* PREGUNTA */}
          <View
            style={{
              paddingVertical: spacing.large,
              paddingHorizontal: spacing.xlarge,
              backgroundColor: paletteApp.blue,
              borderRadius: 20,
              marginBottom: spacing.xxlarge,
            }}>
            <Text
              text={words[currentWordIndex].quiz_p}
              style={textStyles.quiz}
            />
          </View>

          {/* CARDS respuestas */}
          <AppCard
            disabled={disabledCard}
            onPress={() => onCheckAnswer(words[currentWordIndex].quiz_a1, 0)}
            style={selectStyle(0)}>
            <Text
              text={words[currentWordIndex].quiz_a1}
              style={{
                ...textStyles.answer,
                top: Platform.OS === 'android' ? 1.3 : 0,
              }}
            />
          </AppCard>

          <AppCard
            disabled={disabledCard}
            onPress={() => onCheckAnswer(words[currentWordIndex].quiz_a2, 1)}
            style={selectStyle(1)}>
            <Text
              text={words[currentWordIndex].quiz_a2}
              style={{
                ...textStyles.answer,
                top: Platform.OS === 'android' ? 1.3 : 0,
              }}
            />
          </AppCard>

          {words[currentWordIndex].quiz_a3 && (
            <AppCard
              disabled={disabledCard}
              onPress={() =>
                onCheckAnswer(
                  words[currentWordIndex].quiz_a3 ||
                    words[currentWordIndex].quiz_a1,
                  2,
                )
              }
              style={selectStyle(2)}>
              <Text
                text={words[currentWordIndex].quiz_a3}
                style={{
                  ...textStyles.answer,
                  top: Platform.OS === 'android' ? 1.3 : 0,
                }}
              />
            </AppCard>
          )}

          {words[currentWordIndex].quiz_a4 && (
            <AppCard
              disabled={disabledCard}
              onPress={() =>
                onCheckAnswer(
                  words[currentWordIndex].quiz_a4 ||
                    words[currentWordIndex].quiz_a1,
                  3,
                )
              }
              style={selectStyle(3)}>
              <Text
                text={words[currentWordIndex].quiz_a4}
                style={{
                  ...textStyles.answer,
                  top: Platform.OS === 'android' ? 1.3 : 0,
                }}
              />
            </AppCard>
          )}

          {words[currentWordIndex].quiz_a5 && (
            <AppCard
              disabled={disabledCard}
              onPress={() =>
                onCheckAnswer(
                  words[currentWordIndex].quiz_a5 ||
                    words[currentWordIndex].quiz_a1,
                  4,
                )
              }
              style={selectStyle(4)}>
              <Text
                text={words[currentWordIndex].quiz_a5}
                style={{
                  ...textStyles.answer,
                  top: Platform.OS === 'android' ? 1.3 : 0,
                }}
              />
            </AppCard>
          )}

          {words[currentWordIndex].quiz_a6 && (
            <AppCard
              disabled={disabledCard}
              onPress={() =>
                onCheckAnswer(
                  words[currentWordIndex].quiz_a6 ||
                    words[currentWordIndex].quiz_a1,
                  5,
                )
              }
              style={selectStyle(5)}>
              <Text
                text={words[currentWordIndex].quiz_a6}
                style={{
                  ...textStyles.answer,
                  top: Platform.OS === 'android' ? 1.3 : 0,
                }}
              />
            </AppCard>
          )}

          {/* Botón siguiente */}
          <View style={{alignItems: 'center', marginVertical: spacing.xxhuge}}>
            <Pressable
              disabled={showText().disabledState}
              style={({pressed}) => pressed && {opacity: 0.6}}
              onPress={navigateNextScreen}>
              <Text tx={showText().text} style={textStyles.next} />
            </Pressable>
          </View>
        </View>
      </Screen>

      {/* Barra de preguntas */}
      <View
        // style={{
        //   position: 'absolute',
        //   bottom: 0,
        // }}
        >
        <Text
          style={{
            ...textStyles.contador,
            alignSelf: 'flex-end',
            paddingRight: spacing.medium,
            marginBottom: spacing.xxsmall,
          }}>
          {`${currentWordIndex + 1}/10`}
        </Text>

        <View style={{flexDirection: 'row'}}>
          {Array.from({length: 10}).map((_, index) => (
            <View
              key={index}
              style={{
                backgroundColor:
                  index <= currentWordIndex
                    ? '#F55A02'
                    : 'rgba(245, 90, 2, 0.25)',
                height: 15,
                width: 39.27,
              }}
            />
          ))}
        </View>
      </View>
    </>
  );
};
