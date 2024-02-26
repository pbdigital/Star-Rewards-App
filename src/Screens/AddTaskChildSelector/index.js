import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Image,
  ImageChildAvatar,
  ScreenBackground,
  Text,
  Toolbar,
} from '../../Components';
import {useSelector} from 'react-redux';
import {childListSelector, selectedChildSelector} from '../../Redux';
import {COLORS, NAV_ROUTES} from '../../Constants';
import {Images} from '../../Assets/Images';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AddTaskBullet,
  ChildItemContainer,
  Container,
  FooterContainer,
  List,
  ChildItemMetaDataContainer,
} from './styles';

const AddTaskChildSelectorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const allChild = useSelector(childListSelector);
  const selectedChild = useSelector(selectedChildSelector);
  const [selectedChildToCopy, setSelectedChildToCopy] = useState(null);

  const {isBonusTasks} = route?.params ?? {};

  useEffect(() => {
    console.log({allChild});
  }, [allChild]);

  const renderItem = useCallback(({item: child, index}) => {
      const handleOnPressItem = () => {
        setSelectedChildToCopy(child);
      };
      return (
        <ChildItemContainer onPress={handleOnPressItem}>
          <ChildItemMetaDataContainer>
            <ImageChildAvatar
              avatarId={child?.avatarId}
              width={52}
              height={52}
            />
            <Text
              fontSize={18}
              fontWeight="500"
              lineHeight="27"
              color={COLORS.Text.black}
              marginLeft={16}>
              {child.firstName}
            </Text>
          </ChildItemMetaDataContainer>
          {selectedChildToCopy?.id === child.id ? (
            <Image
              source={Images.IcRadioButtonSelected}
              width={24}
              height={24}
            />
          ) : (
            <AddTaskBullet />
          )}
        </ChildItemContainer>
      );
    },
    [selectedChildToCopy],
  );

  const handleOnPressContinue = () => {
    navigation.navigate(NAV_ROUTES.addTaskChildTaskSelector, {
      child: selectedChildToCopy,
      isBonusTasks,
    });
  };

  return (
    <ScreenBackground cloudType={2}>
      <Container>
        <Toolbar title={isBonusTasks ? 'Choose who to copy' : 'Which Child?'} />
        <List
          data={
            allChild
              ? allChild.filter(child => selectedChild.id !== child.id)
              : []
          }
          renderItem={renderItem}
        />
      </Container>
      <FooterContainer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressContinue}
          title="Continue"
          buttonTitleFontSize={16}
          disabled={!selectedChildToCopy}
          marginTop={30}
        />
      </FooterContainer>
    </ScreenBackground>
  );
};

export {AddTaskChildSelectorScreen};
