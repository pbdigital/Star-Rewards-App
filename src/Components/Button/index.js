import React from 'react';
import {Text} from '../Text';
import {ButtonWrapper, ButtonContent, Shadow} from './styles';
import {COLORS} from '../../Constants/colors';
import PropTypes from 'prop-types';

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
      {...props}>
      <Shadow
        backgroundColor={disabled ? COLORS.greyShadow : shadowColor}
        width={width}
        height={height}
        borderRadius={borderRadius}
      />
      <ButtonContent
        width={width}
        height={height}
        borderRadius={borderRadius}
        backgroundColor={disabled ? COLORS.grey : buttonColor}
        disabled={disabled}>
        {children || (
          <Text
            fontSize={buttonTitleFontSize}
            fontWeight="700"
            color={titleColor ?? COLORS.white}>
            {title}
          </Text>
        )}
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
