import React from 'react';
import {CalendarWeek} from '../CalendarWeek';
import {TaskStarList} from '../TaskStarList';
import {AvatarBubbleQuestion} from '../AvatarBubbleQuestion';
import {COLORS} from '../../Constants/Colors';
import {Button} from '../Button';
import {Content, Footer, SafeAreaFooter} from './styles';

const Rewards = () => {
  const handleOnPressCliamButton = () => {};

  const renderFooter = () => (
    <SafeAreaFooter edges={['bottom']}>
      <Footer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressCliamButton}
          title="Claim Reward"
          buttonTitleFontSize={16}
        />
      </Footer>
    </SafeAreaFooter>
  );

  return (
    <Content>
      <CalendarWeek />
      <TaskStarList />
      <AvatarBubbleQuestion />
      {renderFooter()}
    </Content>
  );
};

export {Rewards};
