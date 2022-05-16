import styled from 'styled-components/native';

const StyledImage = styled.Image`
  height: ${({height}) => height || 36}px;
  width: ${({width}) => (width ? width : 0)}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  background-color: ${({backgroundColor}) => backgroundColor || 'transparent'};
  border-radius: ${({borderRadius}) => borderRadius || 0}px;
  ${({tintColor}) => tintColor && `tint-color: ${tintColor}`}
`;

export {StyledImage};
