import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {Text} from '../Text';
import {Image} from '../Image';
import {Container, SelectDropdown, AvatarContainer} from './styles';
import {ImageChildAvatar} from '../ImageChildAvatar';
import {childNameSelector} from '../../Redux/Child/ChildSelectors';
import {doHapticFeedback} from '../../Helpers/TaskUtil';
import {useCallback} from 'react';

const ProfileChildSelector = ({contentContainerStyle, onPressSelectChild}) => {
  const childName = useSelector(childNameSelector);

  const handleOnPressChildSelected = useCallback(() => {
    doHapticFeedback();
    if (onPressSelectChild) {
      onPressSelectChild();
    }
  }, [onPressSelectChild]);

  const childDrowpDown = useMemo(() => {
    if (childName) {
      return (
        <SelectDropdown onPress={handleOnPressChildSelected}>
          <Text
            fontSize={20}
            lineHeight={30}
            fontWeight="600"
            textAlign="center"
            numberOfLines={1}
            marginRight={12}>
            {childName}
          </Text>
          <Image source={Images.IcDropdown} width={14} height={8} />
        </SelectDropdown>
      );
    }

    return null;
  }, [childName, handleOnPressChildSelected]);

  return (
    <Container style={contentContainerStyle || {}}>
      <AvatarContainer onPress={handleOnPressChildSelected}>
        <ImageChildAvatar width={35} height={35} resizeMode="contain" />
      </AvatarContainer>
      {childDrowpDown}
    </Container>
  );
};

export {ProfileChildSelector};
