import React from 'react';
import {View} from 'react-native';
import {Text, ImageChildAvatar} from 'Components';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childListSelector} from '../../AppReduxState';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {COLORS, NAV_ROUTES} from '../../Constants';
import {
  Container,
  Content,
  ListContainer,
  Root,
  SelectorButton,
} from './styles';
import _ from 'lodash';
import {BackButton} from 'src/Components/Toolbar/BackButton';

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

  const handleOnPressBackButton = () => {
    resetToNavigation(NAV_ROUTES.loginUserType);
  };

  return (
    <Root>
      <Container>
        <View>
          <BackButton onPress={handleOnPressBackButton} />
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
            It's time to shine the spotlight on your little stars. Pick the
            child's account you'd like to access below.
          </Text>
        </View>
        <Content>
          {_.chunk(children, 2).map(childChunk => {
            const handleSelectChild = child => {
              dispatch(childActions.setSelectedChild(child));
              resetToNavigation(NAV_ROUTES.bottomTabNavigator);
            };
            if (childChunk.length === 2) {
              return (
                <ListContainer>
                  {childChunk.map(child => (
                    <SelectorButton onPress={() => handleSelectChild(child)}>
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
                  ))}
                </ListContainer>
              );
            }
            return (
              <ListContainer justifyContent="center">
                <SelectorButton
                  onPress={() => handleSelectChild(childChunk[0])}>
                  <ImageChildAvatar
                    avatarId={childChunk[0]?.avatarId}
                    width={60}
                    height={60}
                  />
                  <Text
                    fontWeight="600"
                    fontSize={18}
                    lineHeight={27}
                    marginTop={20}
                    textAlign="center"
                    numberOfLines={1}
                    color={COLORS.Text.black}>
                    {childChunk[0].firstName}
                  </Text>
                </SelectorButton>
              </ListContainer>
            );
          })}
        </Content>
      </Container>
    </Root>
  );
};

export {LoginChildSelectorScreen};
