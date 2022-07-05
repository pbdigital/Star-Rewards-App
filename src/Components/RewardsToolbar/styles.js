import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  padding-bottom: 16px;

  ${({showBorderBottom}) =>
    showBorderBottom
      ? `
      border-bottom-width: 1px;
      border-color: ${COLORS.LightBlue}
    `
      : ''}
`;

export const ToolbarControls = styled.View`
  flex-direction: row;
  flex: 1;
`;
