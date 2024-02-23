import React, {useMemo} from 'react';
import {FormLabel} from '../FormLabel';
import {Root, Row} from './styles';
import {MAX_BONUS_STARS_AWARD_COUNT} from 'Constants';
import {StarsAwardedSelectorListItem} from '../ListItems';

const StarsAwardedSelector = ({
  selectedStarsAwarded,
  onSelect,
  formLabelStyle = {},
  contentContainerStyle,
  label,
  max,
}) => {
  const STARS_AWARDED = useMemo(() => {
    return Array.from(new Array(max ?? MAX_BONUS_STARS_AWARD_COUNT)).map(
      (val, index) => index + 1,
    );
  }, [max]);
  const formLabel = label ?? 'Choose The Number of Stars to Award';
  return (
    <Root style={contentContainerStyle ?? {}}>
      <FormLabel value={formLabel} style={formLabelStyle} />
      <Row justifyContent={'space-between'}>
        {STARS_AWARDED.map((points, index) => (
          <StarsAwardedSelectorListItem
            value={points}
            index={index}
            isSelected={selectedStarsAwarded === points}
            onPress={onSelect}
            key={`${points}-${index}-stars-awarded`}
          />
        ))}
      </Row>
    </Root>
  );
};

export {StarsAwardedSelector};
