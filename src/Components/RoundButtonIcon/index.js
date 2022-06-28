import React from 'react';
import {Container} from './styles';
import PropTypes from 'prop-types';
import {doHapticFeedback} from '../../Helpers/TaskUtil';

const RoundButtonIcon = ({
  icon,
  marginRight,
  backgroundColor,
  onPress,
  size,
  ...props
}) => {
  const handleOnPressIcon = () => {
    doHapticFeedback();
    if (onPress) {
      onPress();
    }
  };

  return (
    <Container
      size={size}
      onPress={handleOnPressIcon}
      backgroundColor={backgroundColor}
      marginRight={marginRight}
      {...props}>
      {icon}
    </Container>
  );
};

RoundButtonIcon.propTypes = {
  icon: PropTypes.any,
  marginRight: PropTypes.number,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.number,
};

RoundButtonIcon.defaultProps = {
  onPress: () => {},
};

export {RoundButtonIcon};
