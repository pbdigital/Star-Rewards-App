import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  QuickTutorial,
  TapAndHold,
  EarningRewards,
  ClaimingRewards,
  AddSwitchChildProfile,
} from 'src/Components/Tutorials';
import {PageContainer} from './styles';
import {Image, Text} from 'Components';
import {Images} from 'src/Assets/Images';
import {COLORS, NAV_ROUTES} from 'Constants';
import {useRef} from 'react';
import {useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';

const TOTAL_PAGES = 5;

const QuickTutorialScreen = () => {
  const navigation = useNavigation();
  const refPager = useRef(null);
  const [curPageIndex, setCurPageIndex] = useState(0);
  const isLastPage = useMemo(
    () => TOTAL_PAGES - 1 === curPageIndex,
    [curPageIndex],
  );

  const toPreviousPage = () => {
    const newPageIndex = curPageIndex - 1;
    refPager?.current.setPageWithoutAnimation(newPageIndex);
    setCurPageIndex(newPageIndex);
  };

  const toNextpage = useCallback(() => {
    if (isLastPage) finishTutorial();
    const newPageIndex = curPageIndex + 1;
    refPager?.current.setPageWithoutAnimation(newPageIndex);
    setCurPageIndex(newPageIndex);
  }, [isLastPage, curPageIndex]);

  const finishTutorial = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: NAV_ROUTES.bottomTabNavigator,
          },
        ],
      }),
    );
  };

  return (
    <View style={{flex: 1}}>
      <PagerView
        initialPage={curPageIndex}
        style={{flex: 1}}
        ref={refPager}
        scrollEnabled={false}>
        <PageContainer key="1">
          <QuickTutorial />
        </PageContainer>
        <PageContainer key="2">
          <TapAndHold onDemoFinished={toNextpage} />
        </PageContainer>
        <PageContainer key="3">
          <EarningRewards />
        </PageContainer>
        <PageContainer key="4">
          <ClaimingRewards />
        </PageContainer>
        <PageContainer key="5">
          <AddSwitchChildProfile />
        </PageContainer>
      </PagerView>
      <TouchableOpacity style={styles.skip} onPress={finishTutorial}>
        <Text
          fontSize={14}
          fontWeight="600"
          color={COLORS.Text.black}
          lineHeight={21}>
          Skip
        </Text>
      </TouchableOpacity>
      {curPageIndex !== 1 && (
        <View style={styles.pageNavigationContainer}>
          {curPageIndex !== 0 && (
            <TouchableOpacity
              style={[styles.controlButtonContainer, styles.leftControlButton]}
              onPress={toPreviousPage}>
              <Image
                source={Images.PageArrow}
                width={22}
                height={19}
                style={styles.leftNavigationButton}
              />
            </TouchableOpacity>
          )}
          {curPageIndex < TOTAL_PAGES && (
            <TouchableOpacity
              style={[styles.controlButtonContainer, styles.rightControlButton]}
              onPress={toNextpage}>
              <Image source={Images.PageArrow} width={22} height={19} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  skip: {
    position: 'absolute',
    top: 55,
    right: 20,
  },
  pageNavigationContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    minHeight: 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 40,
    left: 0,
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
  leftControlButton: {
    position: 'absolute',
    left: 20,
    top: 0,
  },
  rightControlButton: {
    position: 'absolute',
    right: 20,
    top: 0,
  },
});

export {QuickTutorialScreen};
