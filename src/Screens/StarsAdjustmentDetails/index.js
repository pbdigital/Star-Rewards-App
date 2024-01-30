import React, {useMemo} from 'react';
import {RewardsToolbar, ScreenBackground, Text} from '../../Components';
import {
  Container,
  StarContainer,
  BonusStarInfo,
  DescriptionContainer,
  ItemContainer,
} from './styles';
import {COLORS} from '../../Constants';
import {Images} from '../../Assets/Images';

const Star = ({mode, value}) => (
  <StarContainer>
    <BonusStarInfo source={Images.Star} />
    <Text
      fontSize={16}
      fontWeight="600"
      lineHeight={24}
      marginLeft={8}
      color={COLORS.Red}>
      -50
    </Text>
  </StarContainer>
);

const Label = ({value}) => (
  <Text
    fontSize={14}
    fontWeight="500"
    lineHeight={24}
    color={COLORS.Text.black}>
    {value}
  </Text>
);

const Item = ({value, label}) => {
  const rightComponent = useMemo(() => {
    if (typeof value === 'string') {
      return (
        <Text
          fontSize={14}
          fontWeight="500"
          lineHeight={24}
          marginLeft={8}
          color={COLORS.Text.grey}>
          {value}
        </Text>
      );
    }

    return value;
  }, [value]);

  return (
    <ItemContainer>
      <Label value={label} />
      {rightComponent}
    </ItemContainer>
  );
};

const Description = ({value}) => {
  return (
    <DescriptionContainer>
      <Label value="Reason for Adjustment:" />
      <Text
        fontSize={14}
        fontWeight="400"
        lineHeight={24}
        marginTop={20}
        color={COLORS.Text.grey}>
        {value}
      </Text>
    </DescriptionContainer>
  );
}

const StarsAdjustmentDetailsScreen = () => {
  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar
        centerTitle
        hideAvatar
        title="Stars Adjustment"
        hideStarPointDisplay
      />
      <Container>
        <Item label="Date" value="January 23, 2024" />
        <Item label="Old Star Count:" value={<Star value={5} />} />
        <Item label="Adjustment:" value={<Star mode="decrease" value={5} />} />
        <Item label="New Star Count:" value={<Star value={5} />} />
        <Description value="Taking the opportunity to teach a valuable lesson about responsibility. [Child's Name] forgot to complete their homework today. Deducting stars as a gentle reminder to prioritize tasks." />
      </Container>
    </ScreenBackground>
  );
};

export {StarsAdjustmentDetailsScreen};
