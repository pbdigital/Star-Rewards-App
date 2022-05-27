import React from 'react';
import {useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {
  Button,
  Image,
  ImageChildAvatar,
  Toolbar,
  Text,
  ChildTasksListItem,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {
  childBonusTasksSelector,
  childNameSelector,
  childRewardsTasksSelector,
} from '../../Redux/Child/ChildSelectors';
import {
  Root,
  Container,
  Content,
  AvatarContainer,
  AvatarChangeButton,
  ItemContainer,
  LabelContainer,
  SmallAddIconButton,
} from './styles';

const Label = ({value, showAddButton, marginTop, marginBottom}) => (
  <LabelContainer marginTop={marginTop} marginBottom={marginBottom}>
    <Text
      fontSize={18}
      lineHeight={27}
      fontWeight="600"
      textAlign="center"
      color={COLORS.Text.black}>
      {value}
    </Text>
    {showAddButton && (
      <SmallAddIconButton>
        <Image source={Images.IcAdd} width={14} height={14} />
      </SmallAddIconButton>
    )}
  </LabelContainer>
);

const SettingsScreen = () => {
  const childName = useSelector(childNameSelector);
  const rewardsTasks = useSelector(childRewardsTasksSelector);
  const bonusTasks = useSelector(childBonusTasksSelector);

  const handleOnPressSaveButton = () => {};

  return (
    <Root>
      <Container>
        <Toolbar
          title="Settings"
          iconRight={<Image source={Images.IcClock} width={28} height={25} />}
        />
        <Content>
          <AvatarChangeButton>
            <AvatarContainer>
              <ImageChildAvatar width={60} height={60} />
            </AvatarContainer>
            <Text
              fontSize={18}
              lineHeight={27}
              fontWeight="500"
              textAlign="center"
              marginTop={8}
              color={COLORS.Blue}>
              Choose avatar
            </Text>
          </AvatarChangeButton>
          <Label value="Name" />
          <ItemContainer marginTop={7}>
            <Text
              fontSize={18}
              lineHeight={27}
              fontWeight="400"
              color={COLORS.Text.grey}>
              {childName}
            </Text>
          </ItemContainer>
          <Label
            showAddButton
            marginTop={40}
            marginBottom={23}
            value="Current Tasks"
            onPressAddButton={() => {}}
          />
          {rewardsTasks.map((item, index) => {
            let isLast = index !== rewardsTasks.length - 1;
            return (
              <ChildTasksListItem
                {...item}
                hideCloseButton={true}
                marginTop={0}
                marginBottom={isLast ? 16 : 0}
              />
            );
          })}
          <Label
            showAddButton
            marginTop={40}
            marginBottom={23}
            value="Bonus Stars"
            onPressAddButton={() => {}}
          />
          {bonusTasks.map((item, index) => {
            let isLast = index !== bonusTasks.length - 1;
            return (
              <ChildTasksListItem
                {...item}
                hideCloseButton={true}
                marginTop={0}
                marginBottom={isLast ? 16 : 0}
              />
            );
          })}
        </Content>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressSaveButton}
          title="Save"
          buttonTitleFontSize={16}
        />
      </Container>
    </Root>
  );
};

export {SettingsScreen};
