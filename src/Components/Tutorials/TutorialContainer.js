import React from 'react';
import {COLORS} from 'Constants';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../Text';
import {Image} from '../Image';
import {Images} from 'src/Assets/Images';
import {SafeAreaView} from 'react-native-safe-area-context';

const TutorialContainer = ({
  children,
  backgroundColor = COLORS.White,
  title = '',
  demoContent,
}) => {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.root, {backgroundColor: backgroundColor}]}>
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <TouchableOpacity style={styles.skip}>
          <Text
            fontSize={14}
            fontWeight="600"
            color={COLORS.Text.black}
            lineHeight={21}>
            Skip
          </Text>
        </TouchableOpacity>
        <Text
          fontSize={24}
          fontWeight="600"
          color={COLORS.Text.black}
          lineHeight={32}
          marginTop={30}>
          {title}
        </Text>
        <View style={styles.demoContent}>{demoContent}</View>
        <View style={styles.content}>{children}</View>
        <View style={styles.pageNavigationContainer}>
          <TouchableOpacity style={styles.controlButtonContainer}>
            <Image
              source={Images.PageArrow}
              width={22}
              height={19}
              style={styles.leftNavigationButton}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButtonContainer}>
            <Image source={Images.PageArrow} width={22} height={19} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  skip: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingRight: 20,
  },
  demoContent: {
    marginBottom: 50,
    minHeight: 150,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingBottom: 50,
  },
  pageNavigationContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  controlButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftNavigationButton: {
    transform: [{rotate: '180deg'}],
  },
});

export {TutorialContainer};
