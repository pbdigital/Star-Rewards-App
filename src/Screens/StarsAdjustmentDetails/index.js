import React from 'react';
import {
  RewardsToolbar,
  ScreenBackground,
  StarInfoItem,
  StarPoints,
  Text,
} from '../../Components';
import {Container, DescriptionContainer} from './styles';
import {COLORS} from '../../Constants';

const Description = ({value}) => {
  return (
    <DescriptionContainer>
      <Text
        fontSize={14}
        fontWeight="500"
        lineHeight={24}
        fontFamily="Poppins-Medium"
        color={COLORS.Text.black}>
        Reason for Adjustment:
      </Text>
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
};

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
        <StarInfoItem label="Date" value="January 23, 2024" hasBottomBorder />
        <StarInfoItem
          label="Old Star Count:"
          value={<StarPoints value={5} />}
          hasBottomBorder
        />
        <StarInfoItem
          label="Adjustment:"
          value={<StarPoints mode="decrease" value={5} />}
          hasBottomBorder
        />
        <StarInfoItem
          label="New Star Count:"
          value={<StarPoints value={5} />}
        />
        <Description value="Taking the opportunity to teach a valuable lesson about responsibility. [Child's Name] forgot to complete their homework today. Deducting stars as a gentle reminder to prioritize tasks." />
      </Container>
    </ScreenBackground>
  );
};

export {StarsAdjustmentDetailsScreen};
