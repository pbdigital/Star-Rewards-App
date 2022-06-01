import React, {useState} from 'react';
import {
  Button,
  ScreenBackground,
  Toolbar,
  EmojiPicker,
  AppTextInput,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {Container, Content, Form} from './styles';

const AddRewardScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleOnPressAddReward = () => {};
  return (
    <ScreenBackground cloudType={0}>
      <Container>
        <Toolbar title="Add A Reward" />
        <Content>
          <EmojiPicker />
          <Form>
            <AppTextInput label="Reward Name" marginBottom={20} />
            <AppTextInput label="Star Points" marginBottom={20} />
          </Form>
        </Content>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressAddReward}
          title="Add Reward"
          buttonTitleFontSize={16}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </Container>
    </ScreenBackground>
  );
};

export {AddRewardScreen};
