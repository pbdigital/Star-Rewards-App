import { COLORS } from 'Constants';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Images } from 'src/Assets/Images';
import { Text } from '../Text';
import * as Progress from 'react-native-progress';
import { Button } from '../Button';
import { Container, Header, Reward, Stats, Details, MedalIcon, Content, ProgressBarContainer, ButtonContainer } from './styles';

const CurrentRewardGoal = () => {
  return (
    <Container>
      <Header>
        <Text
          fontSize={16}
          fontWeight="600"
          lineHeight={28}
          textAlign="left"
          color={COLORS.White}>
          Your current reward goal
        </Text>
        <MedalIcon source={Images.MedalActive} />
      </Header>
      <Reward>
        <Text fontSize={60} lineHeight={68} marginRight={15}>
          🏂
        </Text>
        <Content>
          <Stats>
            <Details>
              <Text
                fontSize={16}
                fontWeight="600"
                lineHeight={24}
                textAlign="left"
                color={COLORS.Text.black}>
                Doughnut
              </Text>
              <ImageBackground
                source={Images.Star}
                resizeMode="cover"
                style={styles.pointsContainer}>
                <Text
                  fontSize={13}
                  fontWeight="600"
                  lineHeight={20}
                  textAlign="center"
                  color={COLORS.Gold}>
                  10
                </Text>
              </ImageBackground>
            </Details>
          </Stats>
          <ProgressBarContainer>
            <Progress.Bar
              progress={0.3}
              width={null}
              unfilledColor="rgba(193, 236, 190, 0.5)"
              borderColor="transparent"
              color={COLORS.Green}
              borderRadius={100}
            />
          </ProgressBarContainer>
          <Text
            fontSize={13}
            fontWeight="400"
            lineHeight={20}
            textAlign="left"
            color={COLORS.Text.black}>
            5 stars earned - 5 stars to go
          </Text>
        </Content>
      </Reward>
      <ButtonContainer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={() => {}}
          title="Claim Reward"
          buttonTitleFontSize={16}
          disabled={true}
          // isLoading={isLoading}
        />
      </ButtonContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  pointsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 32,
    height: 31,
  },
});

export {CurrentRewardGoal};
