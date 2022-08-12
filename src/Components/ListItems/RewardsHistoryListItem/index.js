import React, {useMemo} from 'react';
import {ImageBackground, View} from 'react-native';
import {COLORS} from 'Constants';
import {Image} from '../../Image';
import {Images} from 'Assets/Images';
import {Text} from '../../Text';
import {CloseButton, Container, Details, BonusStarInfo} from './styles';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {childActions} from 'Redux';
import {doHapticFeedback} from 'Helpers';

const RewardsHistoryListItem = ({
  id,
  name,
  childId,
  emoji,
  starsNeededToUnlock,
  date,
  hideCloseButton,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  isDeleting,
}) => {
  const dispatch = useDispatch();
  const handleOnPressCloseButton = () => {};

  return (
    <Container
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}>
      <Details>
        <Text fontSize={40} lineHeight={50} textAlign="center">
          {emoji}
        </Text>
        <View style={{flex: 1, marginLeft: 16}}>
          <Text
            fontSize={18}
            fontWeight="600"
            lineHeight={27}
            marginBottom={4}
            color={COLORS.Text.black}>
            {name}
          </Text>
          <Text
            fontSize={14}
            fontWeight="400"
            lineHeight={21}
            color={COLORS.Text.lightGrey}>
            {date}
          </Text>
        </View>
        <View>
          <BonusStarInfo source={Images.Star}>
            <Text fontSize={13} fontWeight="600" color="#B46C00">
              {starsNeededToUnlock}
            </Text>
          </BonusStarInfo>
        </View>
      </Details>
      {!hideCloseButton && (
        <CloseButton onPress={handleOnPressCloseButton}>
          <Image source={Images.IcClose} width={12} height={12} />
        </CloseButton>
      )}
    </Container>
  );
};

export {RewardsHistoryListItem};
