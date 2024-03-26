import React, {useMemo} from 'react';
import {COLORS} from 'Constants';
import Modal from 'react-native-modal';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {Text} from '../Text';
import {Button} from '../Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  CloseIconContainer,
  CtaButtonContainer,
  ModalContentContaiener,
  NotesContainer,
  ScreenImageContainer,
  styles,
} from './styles';

const OfferMembershipModal = ({isModalVisible}) => {
  const renderScreenImage = useMemo(() => {
    return (
      <ScreenImageContainer>
        <CloseIconContainer>
          <TouchableOpacity>
            <Image source={Images.IcCloseIapModal} width={48} height={48} />
          </TouchableOpacity>
        </CloseIconContainer>
        <Image source={Images.IapGeneral} width={298} height={260} />
      </ScreenImageContainer>
    );
  }, []);

  const renderCtaButtons = useMemo(() => {
    return (
      <CtaButtonContainer>
        <NotesContainer>
          <Text
            fontSize={28}
            fontWeight="600"
            lineHeight={42}
            textAlign="center"
            fontFamily="Poppins-SemiBold"
            marginBottom={8}>
            You've hit the usage limit for this feature
          </Text>
          <Text
            fontSize={14}
            fontWeight="400"
            lineHeight={21}
            color={COLORS.Text.grey}
            textAlign="center">
            unlock more attempts to continue enjoying uninterrupted fun and
            challenges!
          </Text>
        </NotesContainer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={() => {}}
          title="Try 7 days free"
          buttonTitleFontSize={16}
          marginBottom={12}
        />
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Grey}
          shadowColor={COLORS.GreyShadow}
          onPress={() => {}}
          title="Maybe Later"
          buttonTitleFontSize={16}
        />
      </CtaButtonContainer>
    );
  }, []);

  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={true}
      style={styles.modal}
      backdropColor={'#ffffff'}
      backdropOpacity={1}>
      <ModalContentContaiener>
        {renderScreenImage}
        {renderCtaButtons}
      </ModalContentContaiener>
    </Modal>
  );
};

export {OfferMembershipModal};
