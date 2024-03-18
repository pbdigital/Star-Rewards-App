/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import moment from 'moment';
import {COLORS, WEEK_LABEL} from 'Constants';
import {Text} from '../Text';
import {CalendarWeekItems} from '../ListItems/CalendarWeekItems';
import {getCurrentWeekDays} from 'Helpers';
import {useSelector} from 'react-redux';
import {selectedChildSelector, childIdSelector} from 'AppReduxState';
import {ChildService} from 'Services';
import {Content} from './styles';
import _ from 'lodash';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CalendarWeek = () => {
  const weekDates = getCurrentWeekDays();
  const currentMonth = moment().format('MMMM');
  const childId = useSelector(childIdSelector);
  const selectedChild = useSelector(selectedChildSelector);
  const [tasks, setTasks] = useState([]);
  const refScrollView = useRef(null);
  const weekChunk = _.chunk(weekDates, 7);
  const refCarousel = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(weekChunk.length - 1);

  useEffect(() => {
    retreiveChildTasks();
  }, []);

  useEffect(() => {
    if (refScrollView.current) {
      refScrollView?.current?.scrollToEnd(false);
    }
  }, [refScrollView]);

  useEffect(() => {
    retreiveChildTasks();
  }, [selectedChild]);

  const retreiveChildTasks = useCallback(async () => {
    if (childId) {
      const payload = {
        childId,
        time: moment().format(),
      };
      const {data} = await ChildService.getChildTasks(payload);
      const {success, tasks: childTasks} = data || {};
      if (success && childTasks) {
        setTasks(childTasks);
      }
    }
  }, [childId]);

  return (
    <Content>
      <r>
        <Text
          fontSize={18}
          fontWeight="600"
          lineHeight={27}
          color={COLORS.White}>
          {currentMonth}
        </Text>
        <Text
          fontSize={13}
          fontWeight="500"
          lineHeight={20}
          color={COLORS.White}>
          {WEEK_LABEL[currentIndex]}
        </Text>
      </r>
      <View style={{overflow: 'hidden'}}>
        <Carousel
          ref={refCarousel}
          slideStyle={{
            paddingLeft: Dimensions.get('screen').width * 0.02,
          }}
          firstItem={weekChunk.length - 1}
          data={weekChunk ?? []}
          inactiveSlideScale={1}
          activeSlideAlignment="center"
          renderItem={({item}) => (
            <View style={{flexDirection: 'row'}}>
              {item.map((date, index) => (
                <CalendarWeekItems
                  date={date}
                  key={`${index}-calendar-date-item`}
                  tasks={tasks}
                />
              ))}
            </View>
          )}
          sliderWidth={Dimensions.get('screen').width * 0.8}
          itemWidth={Dimensions.get('screen').width * 0.8}
          activeSlideOffset={2}
          enableMomentum={true}
          onSnapToItem={setCurrentIndex}
        />
      </View>
    </Content>
  );
};

export {CalendarWeek};
