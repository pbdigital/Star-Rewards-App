import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Text} from '../Text';
import {ButtonWrapper, ButtonContent, Shadow, ChildContainer} from './styles';
import {COLORS} from 'Constants';
import PropTypes from 'prop-types';
import {doHapticFeedback} from 'Helpers';

const Button = ({
  title,
  width,
  height,
  borderRadius,
  buttonColor,
  shadowColor,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  titleColor,
  disabled,
  alignSelf,
  children,
  buttonTitleFontSize = 18,
  buttonTitleLineHeight = 24,
  leftIcon,
  isLoading,
  onPress,
  noShadow,
  ...props
}) => {
  return (
    <ButtonWrapper
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      alignSelf={alignSelf}
      disabled={disabled}
      {...props}
      onPress={() => {
        doHapticFeedback();
        if (onPress) {
          onPress();
        }
      }}>
      {!noShadow && (
        <Shadow
          backgroundColor={disabled ? COLORS.GreyShadow : shadowColor}
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      )}
      <ButtonContent
        width={width}
        height={height}
        borderRadius={borderRadius}
        backgroundColor={disabled ? COLORS.Grey : buttonColor}
        disabled={disabled}>
        {children ||
          (isLoading ? (
            <ActivityIndicator color={COLORS.White} />
          ) : (
            <ChildContainer>
              {leftIcon || null}
              <Text
                marginLeft={leftIcon ? 10 : 0}
                fontSize={buttonTitleFontSize}
                lineHeight={buttonTitleLineHeight}
                fontWeight="600"
                fontFamily="Poppins-SemiBold"
                color={titleColor ?? COLORS.white}>
                {title}
              </Text>
            </ChildContainer>
          ))}
      </ButtonContent>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  borderRadius: PropTypes.number,
  buttonColor: PropTypes.string,
  shadowColor: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  titleColor: PropTypes.string,
  disabled: PropTypes.bool,
  alignSelf: PropTypes.string,
};

export {Button};
