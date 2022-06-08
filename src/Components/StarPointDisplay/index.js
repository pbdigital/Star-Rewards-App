import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {COLORS} from '../../Constants/Colors';
import {childStarsSelector} from '../../Redux/Child/ChildSelectors';
import {layoutActions} from '../../Redux/Layout/LayoutSlice';
import {Image} from '../Image';
import {Text} from '../Text';
import {Points} from './styles';

const StartPointDisplay = ({marginRight}) => {
  const dispatch = useDispatch();
  const selectedChildStar = useSelector(childStarsSelector);

  const handleOnLayout = ({nativeEvent}) => {
    console.log('STAR LAYOUT', {nativeEvent});
    const {layout} = nativeEvent;
    dispatch(layoutActions.setToolbarStarPosition(layout));
  };

  return (
    <Points marginRight={marginRight} onLayout={handleOnLayout}>
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
