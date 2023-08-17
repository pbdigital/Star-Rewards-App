import React from 'react';
import {COLORS} from 'Constants';
import {StyleSheet, View} from 'react-native';
import {Text} from '../Text';
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
        <Text
          fontSize={24}
          fontWeight="600"
          color={COLORS.Text.black}
          lineHeight={32}>
          {title}
        </Text>
        <View style={styles.demoContent}>{demoContent}</View>
        <View style={styles.content}>{children}</View>
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
    paddingTop: 60,
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
});

export {TutorialContainer};
