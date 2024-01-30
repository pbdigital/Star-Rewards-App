import React from 'react';
import {
  AppTextInput,
  Button,
  RewardsToolbar,
  ScreenBackground,
  Text,
} from '../../Components';
import {
  Container,
  FormElementContainer,
  Form,
  RadioButtonContainer,
  DotActive,
  RadioButtonRoot,
  DotInActive,
  RadioButtonSpacer,
} from './styles';
import {COLORS} from '../../Constants';

const RadioButton = ({isSelected, label, onPress}) => {
  return (
    <RadioButtonRoot onPress={onPress}>
      {isSelected ? <DotActive /> : <DotInActive />}
      <Text
        fontSize={16}
        fontWeight="400"
        textAlign="center"
        marginLeft={16}
        color={COLORS.Text.grey}>
        {label}
      </Text>
    </RadioButtonRoot>
  );
};

const StarsAdjustmentFormScreen = () => {
  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar
        centerTitle
        hideAvatar
        title="Stars Adjustment"
        hideStarPointDisplay
      />
      <Container>
        <Text
          fontSize={16}
          fontWeight="400"
          lineHeight={28}
          textAlign="center"
          color={COLORS.Text.grey}>
          Ready to fine-tune the stars in
          {'\n'}
          [Child's Name]'s sky? Let's make it
          {'\n'}
          happen smoothly.
        </Text>
        <Form>
          <FormElementContainer>
            <Text
              fontSize={18}
              fontWeight="500"
              lineHeight={28}
              textAlign="left"
              marginBottom={20}
              color={COLORS.Text.black}>
              Adjustment Mode
            </Text>
            <RadioButtonContainer>
              <RadioButton isSelected={true} label="Increase" />
              <RadioButtonSpacer />
              <RadioButton isSelected={false} label="Decrease" />
            </RadioButtonContainer>
          </FormElementContainer>
          <FormElementContainer>
            <Text
              fontSize={18}
              fontWeight="500"
              lineHeight={28}
              textAlign="left"
              color={COLORS.Text.black}>
              Star Quantity
            </Text>
            <AppTextInput placeholder="0" />
          </FormElementContainer>
          <FormElementContainer>
            <Text
              fontSize={18}
              fontWeight="500"
              lineHeight={28}
              textAlign="left"
              color={COLORS.Text.black}>
              Reason for Adjustment
            </Text>
            <AppTextInput
              placeholder="Write your reason"
              multiline
              style={{minHeight: 150}}
            />
          </FormElementContainer>
        </Form>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={() => {}}
          title="Claim Reward"
          buttonTitleFontSize={16}
          disabled={false}
        />
      </Container>
    </ScreenBackground>
  );
};

export {StarsAdjustmentFormScreen};
