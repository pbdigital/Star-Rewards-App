import { reduce } from 'lodash';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Images} from '../../../Assets/Images';
import {COLORS} from '../../../Constants/Colors';
import {Image} from '../../Image';
import {Text} from '../../Text';
import {Card, Container, AddItemContainer} from './styles';

const RewardsListItem = ({item}) => {
  const {name, starsNeededToUnlock, emoji, isAddItem} = item;
  if (isAddItem) {
    return (
      <Card paddingBottom={8}>
        <AddItemContainer>
          <Image
            source={Images.IcAdd}
            width={24}
            height={24}
            style={styles.addIcon}
          />
          <Text
            fontSize={16}
            fontWeight="600"
            lineHeight={24}
            textAlign="center"
            marginTop={20}
            color={COLORS.Blue}>
            Add A Reward
          </Text>
        </AddItemContainer>
      </Card>
    );
  }

  return (
    <Card opacity={0.5}>
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
          {starsNeededToUnlock}
        </Text>
      </ImageBackground>
      <Container>
        <Text fontSize={60} lineHeight={72} textAlign="center">
          {emoji}
        </Text>
      </Container>
      <Text
        fontSize={16}
        fontWeight="600"
        lineHeight={24}
        textAlign="center"
        marginTop={11}
        color={COLORS.Text.black}>
        {name}
      </Text>
    </Card>
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
  addIcon: {
    tintColor: COLORS.Blue,
  },
});

export {RewardsListItem};
