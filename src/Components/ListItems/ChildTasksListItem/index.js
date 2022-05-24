import React from 'react';
import {COLORS} from '../../../Constants/Colors';
import {Text} from '../../Text';
import {Container} from './styles';

const ChildTasksListItem = ({name}) => {
  return (
    <Container>
      <Text
        fontSize={18}
        fontWeight="600"
        lineHeight={27}
        color={COLORS.Text.black}>
        {name}
      </Text>
      <Text fontSize={14} fontWeight="400" lineHeight={21} color={COLORS.Blue}>
        [FREQUENCY HERE]
      </Text>
    </Container>
  );
};

export {ChildTasksListItem};
