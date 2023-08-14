import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import {CloudImage} from '../CloudImage';
import {Text} from '../Text';
import {COLORS} from 'Constants';
import {Images} from 'src/Assets/Images';
import {WelcomeContainer} from './styles';
import { isEmpty } from 'lodash';

const EmptyListState = ({
  hideCloudLeft = false,
  hideCloudRight = false,
  message = '',
  footerNote = '',
  starImage,
  containerFlex,
  contentContainerStyle,
  starImageContainer,
}) => {
  return (
    <WelcomeContainer flex={containerFlex} style={contentContainerStyle ?? {}}>
      <ImageBackground
        source={Images.NoBonusTextCloud}
        resizeMode="contain"
        style={styles.ImageBackground}
        height={229}>
        {!hideCloudRight && <CloudImage style={styles.cloudImageRight} />}
        <Text
          textAlign="center"
          fontSize={14}
          lineHeight={22}
          color={COLORS.Text.black}
          fontWeight="400"
          style={styles.welcomeText}>
          {message}
        </Text>
        {!hideCloudLeft && <CloudImage style={styles.cloudImageLeft} />}
      </ImageBackground>
      <View style={[styles.starImageContainer, starImageContainer ?? {}]}>{starImage}</View>
      {!isEmpty(footerNote) && (
        <Text
          textAlign="center"
          fontSize={16}
          lineHeight={28}
          color={COLORS.Text.black}
          marginTop={26}
          fontWeight="400"
          style={{width: 280}}>
          {footerNote}
        </Text>
      )}
    </WelcomeContainer>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  footerEditDelete: {
    fontStyle: 'italic',
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: 16,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  currentRewardGoalContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  cloudImageRight: {
    position: 'absolute',
    top: 0,
    right: -25,
  },
  cloudImageLeft: {
    position: 'absolute',
    top: 170,
    left: 0,
  },
  welcomeText: {
    position: 'absolute',
    top: 55,
    left: Dimensions.get('screen').width / 2 - (200 / 2),
    width: 220,
  },
  ImageBackground: {
    height: 229,
    width: '100%',
  },
  starImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -75,
  },
});

export {EmptyListState};
