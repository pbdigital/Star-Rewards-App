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
  challenge,
  onPressDangerButton,
  onPressNeutralButton,
  isForYesterday,
}) => {
  const renderRightButtons = useMemo(() => {
    return (
      <Right>
        <RoundButtonIcon
          icon={<IconEdit />}
          onPress={onPressDangerButton}
          backgroundColor={COLORS.Blue}
          marginRight={10}
        />
        <RoundButtonIcon
          icon={<IconTrash />}
          onPress={onPressNeutralButton}
          backgroundColor={COLORS.Red}
        />
      </Right>
    );
  }, []);

  return <Container>{renderRightButtons}</Container>;
};

export {ListSwipeControlButtons};
