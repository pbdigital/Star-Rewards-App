import React from 'react';
import {ScreenBackground} from '../../Components/ScreeBackground';
import {Text} from '../../Components/Text';
import {Button} from '../../Components/Button';
import {COLORS} from '../../Constants/colors';
import {Container, Content, TextInput, Footer} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChildNameInputScreen = () => {
  return (
    <>
      <ScreenBackground>
        <Container paddingLeft={20} paddingRight={20}>
          <Content>
            <Text
              textAlign="center"
              fontSize={24}
              fontWeight="600"
              lineHeight={36}>
              {'What is the name of\nyour child?'}
            </Text>
            <TextInput autoFocus selectionColor={COLORS.Blue} />
          </Content>
        </Container>
      </ScreenBackground>
      <SafeAreaView
        edges={['bottom']}
        style={{backgroundColor: COLORS.Background}}>
        <Footer>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={'#70AF6B'}
            onPress={() => {}}
            title="Continue"
            buttonTitleFontSize={16}
          />
        </Footer>
      </SafeAreaView>
    </>
  );
};

export {ChildNameInputScreen};
