import React from 'react';
import PropTypes from 'prop-types';
import {StyledImage} from './styles';

const Image = props => {
  return <StyledImage {...props} />;
};

Image.propTypes = {
  source: PropTypes.any,
  height: PropTypes.number,
  width: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
};

Image.defaultProps = {
  source: null,
  height: 36,
  width: 36,
  marginRight: 0,
  marginTop: 0,
  backgroundColor: 'transparent',
  borderRadius: 0,
};

export {Image};
