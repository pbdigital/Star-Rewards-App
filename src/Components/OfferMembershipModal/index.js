import React from 'react';
import {Text} from 'react-native';
import Modal from 'react-native-modal';

const OfferMembershipModal = ({
  isModalVisible,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={true}
      style={{margin: 0, justifyContent: 'flex-start'}}
      backdropColor={'#ffffff'}
      backdropOpacity={1}>
        <Text>
          Offer Membership Modal
        </Text>
    </Modal>
  );
};

export {OfferMembershipModal};
