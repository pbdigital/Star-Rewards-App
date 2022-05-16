import styled from 'styled-components/native';
import {COLORS} from '../../Constants/colors';

const StyledText = styled.Text`
  font-size: ${({fontSize}) => fontSize || 16}px;
  color: ${({color}) => color || COLORS.Black};
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
  line-height: ${({lineHeight}) => lineHeight || 19}px;
  text-align: ${({textAlign}) => textAlign || 'left'};
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
`;

export {StyledText};
