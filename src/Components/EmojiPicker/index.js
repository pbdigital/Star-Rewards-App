import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Images} from 'Assets/Images';
import {Image} from '../Image';
import {Text} from '../Text';
import {COLORS} from 'Constants';
import {BottomSheetContainer, Container, EmojiContainer} from './styles';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import EmojiSelector from 'react-native-emoji-selector';
import {CustomBottomSheetBackdrop} from '../CustomBottomSheetBackdrop';
import {doHapticFeedback} from 'Helpers';
import { Dimensions, View } from 'react-native';

const EmojiPicker = ({onEmojiSelected, onEmojiChange, hasError, value}) => {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handlePresentModalPress = useCallback(() => {
    doHapticFeedback();
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    setSelectedEmoji(value);
  }, [value]);

  const handleOnEmojiSelected = emoji => {
    setSelectedEmoji(emoji);
    onEmojiSelected(emoji);
    onEmojiChange(emoji);
    bottomSheetModalRef?.current?.close();
  };

  return (
    <Container onPress={handlePresentModalPress}>
      <EmojiContainer hasError={hasError}>
        {selectedEmoji ? (
          <Text fontSize={60} lineHeight={100}>
            {selectedEmoji}
          </Text>
        ) : (
          <Image
            source={Images.IcAdd}
            width={16}
            height={16}
            style={{tintColor: hasError ? COLORS.LightRed : COLORS.LightBlue}}
          />
        )}
      </EmojiContainer>
      <Text
        marginTop={12}
        fontSize={18}
        fontWeight="500"
        lineHeight={27}
        color={hasError ? COLORS.LightRed : COLORS.Blue}
        textAlign="center">
        Choose emoji
      </Text>
      <BottomSheetModal
        backdropComponent={CustomBottomSheetBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetContainer>
          <EmojiSelector
            onEmojiSelected={handleOnEmojiSelected}
            showSearchBar={true}
            columns={8}
          />
        </BottomSheetContainer>
      </BottomSheetModal>
    </Container>
  );
};

export {EmojiPicker};
