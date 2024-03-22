import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from '..';
import {COLORS} from '../../Constants';
import {noop} from 'lodash';
import {Images} from '../../Assets/Images';
import styles from './styles';
import {doHapticFeedback} from '../../Helpers';

const PageHeaderTitle = ({
  onPressHelpButton = noop,
  title = '',
  subTitle = '',
}) => {
  const handleOnHelpPress = useCallback(() => {
    if (!onPressHelpButton) return;
    doHapticFeedback();
    onPressHelpButton();
  }, [onPressHelpButton]);

  const renderHelpButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={handleOnHelpPress}>
        <Image source={Images.IcHelp} style={styles.icHelp} />
      </TouchableOpacity>
    );
  }, [handleOnHelpPress]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <Text
          fontSize={20}
          lineHeight={28}
          fontWeight="600"
          fontFamily="Poppins-SemiBold"
          textAlign="left"
          marginBottom={11}
          color={COLORS.Black}>
          {title}
        </Text>
        {renderHelpButton()}
      </View>
      <Text
        fontSize={16}
        fontWeight="400"
        lineHeight={28}
        textAlign="left"
        color={COLORS.Black}>
        {subTitle}
      </Text>
    </View>
  );
};

export {PageHeaderTitle};
