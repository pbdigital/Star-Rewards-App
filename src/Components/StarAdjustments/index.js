/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState} from 'react';
import {StarAdjustmentListItem} from '../ListItems';
import {Container, Root} from './styles';

const MOCK_STARS = Array.from(new Array(5));

const StarAdjustments = () => {
  const [refSwipeRows, setRefSwipeRows] = useState([]);

  const closeRowExcept = (rows, activeIndex) => {
    rows?.forEach((itemSwipeRow, index) => {
      if (index === activeIndex) {
        return;
      }

      itemSwipeRow?.closeRow();
    });
  };

  const renderItems = useMemo(() => {
    setRefSwipeRows([]);
    return MOCK_STARS.map((item, index) => {
      return (
        <StarAdjustmentListItem
          ref={ref => refSwipeRows?.push(ref)}
          {...item}
          key={`${index}-${item?.id}-star-adjustment`}
          hideCloseButton={true}
          marginTop={0}
          marginBottom={16}
          handleOnRowOpen={() => {
            closeRowExcept(refSwipeRows, index);
          }}
        />
      );
    });
  }, []);

  return (
    <Root>
      <Container>{renderItems}</Container>
    </Root>
  );
};

export {StarAdjustments};
