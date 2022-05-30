import React, {useMemo} from 'react';
import {noop} from 'lodash';
import {Container, Right} from './styles';
import {COLORS} from '../../Constants/Colors';
import {Image} from '../Image';
import {RoundButtonIcon} from '../RoundButtonIcon';
import {Images} from '../../Assets/Images';

const IconEdit = () => <Image source={Images.IcEdit} height={21} width={21} />;
const IconTrash = () => (
  <Image source={Images.IcTrash} height={20} width={18} />
);

const ListSwipeControlButtons = ({
  onFinishedMarkChallengeComplete = noop,
  item,
  onPressDangerButton,
  onPressNeutralButton,
  isForYesterday,
}) => {
  console.log('wahahaha', {item});
  const renderRightButtons = useMemo(() => {
    return (
      <Right>
        <RoundButtonIcon
          icon={<IconEdit />}
          onPress={onPressNeutralButton}
          backgroundColor={COLORS.Blue}
          marginRight={10}
        />
        <RoundButtonIcon
          icon={<IconTrash />}
          onPress={() => onPressDangerButton({taskId: item?.id})}
          backgroundColor={COLORS.Red}
        />
      </Right>
    );
  }, [item]);

  return <Container>{renderRightButtons}</Container>;
};

export {ListSwipeControlButtons};
