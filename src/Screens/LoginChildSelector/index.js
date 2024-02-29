import React from 'react';
import {View} from 'react-native';
import {Text, ImageChildAvatar} from 'Components';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childListSelector} from '../../Redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {COLORS, NAV_ROUTES} from '../../Constants';
import {
  Container,
  Content,
  ListContainer,
  Root,
  SelectorButton,
} from './styles';

const LoginChildSelectorScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const children = useSelector(childListSelector);

  const resetToNavigation = routeName => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: routeName,
          },
        ],
      }),
    );
  };

  return (
    <Root>
      <Container>
        <View>
          <Text
            fontWeight="600"
            fontSize={22}
            lineHeight={32}
            marginBottom={8}
            textAlign="center"
            color={COLORS.Text.black}>
            Choose Your Little Star
          </Text>
          <Text
            fontWeight="400"
            fontSize={14}
            lineHeight={21}
            textAlign="center"
            color={COLORS.Text.grey}>
            It's time to shine the spotlight on your little stars. Pick the child's
            account you'd like to access below.
          </Text>
        </View>
        <Content>
          <ListContainer>
          {children.map(child => {
              const handleSelectChild = () => {
                dispatch(childActions.setSelectedChild(child));
                resetToNavigation(NAV_ROUTES.bottomTabNavigator);
              };
              return (
                <SelectorButton onPress={handleSelectChild}>
                  <ImageChildAvatar
                    avatarId={child?.avatarId}
                    width={60}
                    height={60}
                  />
                  <Text
                    fontWeight="600"
                    fontSize={18}
                    lineHeight={27}
                    marginTop={20}
                    textAlign="center"
                    color={COLORS.Text.black}>
                    {child.firstName}
                  </Text>
                </SelectorButton>
              );
            })}
          </ListContainer>
        </Content>
      </Container>
    </Root>
  );
};

export {LoginChildSelectorScreen};
