import React from 'react';
import {FormLabel} from '../FormLabel';
import {Root, Row} from './styles';
import {MAX_BONUS_STARS_AWARD_COUNT} from '../../Constants/Defaults';
import {StarsAwardedSelectorListItem} from '../ListItems';

const STARS_AWARDED = Array.from(new Array(MAX_BONUS_STARS_AWARD_COUNT)).map(
  (val, index) => index + 1,
);

const StarsAwardedSelector = ({
  selectedStarsAwarded,
  onSelect,
  formLabelStyle = {},
}) => {
  return (
    <Root>
      <FormLabel value="Stars Awarded" style={formLabelStyle} />
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
