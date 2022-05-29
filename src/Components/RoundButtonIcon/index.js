import React from 'react';
import {Container} from './styles';
import PropTypes from 'prop-types';

const RoundButtonIcon = ({
  icon,
  marginRight,
  backgroundColor,
  onPress,
  size,
  ...props
}) => {
  return (
    <Container
      size={size}
      onPress={onPress}
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
