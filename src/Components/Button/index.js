import React from 'react';
import {Text} from '../Text';
import {ButtonWrapper, ButtonContent, Shadow, ChildContainer} from './styles';
import {COLORS} from '../../Constants/Colors';
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
  leftIcon,
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
        backgroundColor={disabled ? COLORS.GreyShadow : shadowColor}
        width={width}
        height={height}
        borderRadius={borderRadius}
      />
      <ButtonContent
        width={width}
        height={height}
        borderRadius={borderRadius}
        backgroundColor={disabled ? COLORS.Grey : buttonColor}
        disabled={disabled}>
        {children || (
          <ChildContainer>
            {leftIcon || null}
            <Text
              marginLeft={leftIcon ? 10 : 0}
              fontSize={buttonTitleFontSize}
              fontWeight="700"
              color={titleColor ?? COLORS.white}>
              {title}
            </Text>
          </ChildContainer>
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
