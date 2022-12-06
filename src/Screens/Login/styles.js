import styled from 'styled-components/native';

export const Content = styled.View`
  padding: 30px;
  justify-content: space-between;
  flex: 1;
`;

export const FormContainer = styled.View`
  margin-top: 58px;
`;

export const InputContainer = styled.View`
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-top: ${({marginBottom}) => marginBottom || 0}px;
`;

export const FooterContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
