import { COLORS } from 'Constants';
import React, { useMemo } from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import { Image } from '../Image';
import { Images } from 'src/Assets/Images';
import { Text } from '../Text';
import { Button } from '../Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OfferMembershipModal = ({
  isModalVisible,
}) => {

  const renderScreenImage = useMemo(() => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          position: 'absolute',
          top: 56,
          left: 16,
        }}>
        <TouchableOpacity>
          <Image source={Images.IcCloseIapModal} width={48} height={48} />
        </TouchableOpacity>
        </View>
        <Image source={Images.IapGeneral} width={298} height={260} />
    </View>
    );
  }, []);

  const renderCtaButtons = useMemo(() => {
    return (
      <View style={{
        height: 391,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 38,
        paddingHorizontal: 35,
      }}>
        <View style={{marginBottom: 25}}>
          <Text
            fontSize={28}
            fontWeight="600"
            lineHeight={42}
            textAlign="center"
            fontFamily="Poppins-SemiBold"
            marginBottom={8}
            >
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
        </View>
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
    </View>
    );
  }, []);

  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={true}
      style={{
        margin: 0,
        justifyContent: 'flex-start',
      }}
      backdropColor={'#ffffff'}
      backdropOpacity={1}>
        <View style={{
          backgroundColor: COLORS.LightGreen,
          flex: 1,
        }}>
        {renderScreenImage}
        {renderCtaButtons}
      </View>
    </Modal>
  );
};

export {OfferMembershipModal};
