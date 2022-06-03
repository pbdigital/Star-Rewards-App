import React from 'react';
import {useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {COLORS} from '../../Constants/Colors';
import {childStarsSelector} from '../../Redux/Child/ChildSelectors';
import {Image} from '../Image';
import {Text} from '../Text';
import {Points} from './styles';

const StartPointDisplay = ({marginRight}) => {
  const selectedChildStar = useSelector(childStarsSelector);

  return (
    <Points marginRight={marginRight}>
      <Image source={Images.Star} width={30} height={29} marginRight={10} />
      <Text
        fontSize={20}
        lineHeight={30}
        fontWeight="600"
        textAlign="center"
        color={COLORS.Gold}>
        {selectedChildStar}
      </Text>
    </Points>
  );
};

export {StartPointDisplay};
