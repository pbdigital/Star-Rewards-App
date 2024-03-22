import React from 'react';
import PropTypes from 'prop-types';
import {StyledText} from './styles';
import {COLORS} from 'Constants';

const Text = props => {
  return <StyledText {...props} />;
};

Text.propTypes = {
  fontSize: PropTypes.number,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  lineHeight: PropTypes.number,
  textAlign: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
};

Text.defaultProps = {
  fontSize: 16,
  color: COLORS.black,
  fontWeight: 'normal',
  lineHeight: 24,
  textAlign: 'left',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
};

export {Text};
