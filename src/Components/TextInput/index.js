import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Images} from 'Assets/Images/index';
import {
  Container,
  LeftIcon,
  RightIcon,
  StyledTextInput,
  TogglePasswordIcon,
} from './styles';
import {Text} from '../Text';
import {COLORS} from 'Constants';
import {doHapticFeedback} from 'Helpers';

const TextInput = ({
  leftImage,
  rightImage,
  marginTop,
  isPassword,
  marginBottom,
  hidePasswordToggle,
  errorMessage,
  containerStyle,
  ...props
}) => {
  const [secureText, setSecureText] = useState(!!props?.secureTextEntry);

  return (
    <View>
      <Container
        marginTop={marginTop}
        marginBottom={marginBottom}
        style={containerStyle || {}}>
        {leftImage && <LeftIcon source={leftImage} />}
        <StyledTextInput {...props} secureTextEntry={secureText} />
        {isPassword && !hidePasswordToggle && (
          <TouchableOpacity
            onPress={() => {
              doHapticFeedback();
              setSecureText(!secureText);
            }}>
            <TogglePasswordIcon
              source={
                secureText ? Images.IcPasswordHidden : Images.IcPasswordShown
              }
            />
          </TouchableOpacity>
        )}
        {rightImage && <RightIcon source={rightImage} />}
      </Container>
      {errorMessage && (
        <Text fontSize={14} marginTop={4} marginLeft={8} color={COLORS.Red}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export {TextInput};
