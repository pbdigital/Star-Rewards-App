import React from 'react';
import {CalendarWeek} from '../CalendarWeek';
import {TaskStarList} from '../TaskStarList';
import {COLORS} from '../../Constants/Colors';
import {Button} from '../Button';
import {Content, Footer, SafeAreaFooter} from './styles';
import {AvatarSpeaking, BubblePosition} from '../AvatarSpeaking';
import {Text} from '../Text';
import {useSelector} from 'react-redux';
import {childRewardsTasksSelector} from '../../Redux/Child/ChildSelectors';

const Rewards = () => {
  const tasks = useSelector(childRewardsTasksSelector);
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
    <>
      <Content>
        <CalendarWeek />
        <TaskStarList tasks={tasks} />
        <AvatarSpeaking
          message={() => (
            <Text
              textAlign="center"
              fontSize={16}
              lineHeight={24}
              color={COLORS.Text.grey}
              fontWeight="400">
              What tasks have you{'\n'}done today?
            </Text>
          )}
          bubblePosition={BubblePosition.right}
        />
      </Content>
      {renderFooter()}
    </>
  );
};

export {Rewards};
