import styled from 'styled-components/native';

export const Points = styled.TouchableOpacity`
  flex-direction: row;
  margin-right: ${({marginRight}) => marginRight || 0}px;
`;
