import React, {useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childIdSelector} from 'Redux';
import {StarAdjustmentListItem} from '../ListItems';

const MOCK_STARS = Array.from(new Array(5));

const StarAdjustments = () => {
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
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
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{marginTop: 30}}>{renderItems}</View>
    </ScrollView>
  );
};

export {StarAdjustments};
