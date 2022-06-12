import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Toolbar,
  AppTextInput,
  LoadingIndicator,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {userInforSelector} from '../../Redux/User/UserSelectors';
import {Root, Container, Content, Padded} from './styles';

const MyAccountUpdateNameScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(userInforSelector);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnPressSaveButton = () => {
    return;
  };

  return (
    <>
      <Root>
        <Container>
          <Padded>
            <Toolbar title="Update Name" />
          </Padded>
          <Content>
            <AppTextInput
              label="Name"
              onChangeText={() => {}}
              // errorMessage={childNameInputError}
              value={userInfo?.firstName}
              // style={styles.textInput}
            />
          </Content>
          <Padded>
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleOnPressSaveButton}
              title="Save"
              buttonTitleFontSize={16}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </Padded>
        </Container>
        {isLoading && <LoadingIndicator />}
      </Root>
    </>
  );
};

export {MyAccountUpdateNameScreen};
