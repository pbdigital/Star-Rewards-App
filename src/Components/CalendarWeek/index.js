/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useRef} from 'react';
import moment from 'moment';
import {COLORS, DATE_FORMAT, WEEK_LABEL} from 'Constants';
import {Text} from '../Text';
import {CalendarWeekItems} from '../ListItems/CalendarWeekItems';
import {getCurrentWeekDays} from 'Helpers';
import {batch, useDispatch, useSelector} from 'react-redux';
import {
  selectedChildSelector,
  childIdSelector,
  childActions,
} from 'AppReduxState';
import {ChildService} from 'Services';
import {
  CarouselContainer,
  Content,
  LabelContainer,
  WeekItemContainer,
} from './styles';
import _ from 'lodash';
import {Dimensions, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CalendarWeek = () => {
  const weekDates = getCurrentWeekDays();
  const dispatch = useDispatch();
  const currentMonth = moment().format('MMMM');
  const childId = useSelector(childIdSelector);
  const selectedChild = useSelector(selectedChildSelector);
  const [tasks, setTasks] = useState([]);
  const weekChunk = _.chunk(weekDates, 7);
  const refCarousel = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(weekChunk.length - 1);

  useEffect(() => {
    retreiveChildTasks();
  }, []);

  useEffect(() => {
    if (refCarousel?.current) {
      refCarousel?.current?.snapToItem(weekChunk.length - 1, false);
    }
  }, [selectedChild]);

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

  const handleOnPressGoToToday = useCallback(() => {
    if (currentIndex === weekChunk.length - 1) {
      return;
    }
    refCarousel?.current?.snapToItem(weekChunk.length - 1, true);
    batch(() => {
      dispatch(
        childActions.setSelectedDateToShowTask(moment().format(DATE_FORMAT)),
      );
      dispatch(
        childActions.getChildTasks({
          childId,
          time: moment(),
        }),
      );
    });
  }, [refCarousel, childId, currentIndex]);

  return (
    <Content>
      <LabelContainer>
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
        {/* <TouchableOpacity onPress={handleOnPressGoToToday}> // Week label - Commented for options
          <Text
            fontSize={13}
            fontWeight="500"
            lineHeight={20}
            color={COLORS.White}>
            {currentIndex === weekChunk.length - 1 ? 'This Week' : 'Goto Today'}
          </Text>
        </TouchableOpacity> */}
      </LabelContainer>
      <CarouselContainer>
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
            <WeekItemContainer>
              {item.map((date, index) => (
                <CalendarWeekItems
                  date={date}
                  key={`${index}-calendar-date-item`}
                  tasks={tasks}
                />
              ))}
            </WeekItemContainer>
          )}
          sliderWidth={Dimensions.get('screen').width * 0.8}
          itemWidth={Dimensions.get('screen').width * 0.8}
          activeSlideOffset={2}
          enableMomentum={true}
          onSnapToItem={setCurrentIndex}
        />
      </CarouselContainer>
    </Content>
  );
};

export {CalendarWeek};
