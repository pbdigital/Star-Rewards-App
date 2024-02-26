import React, {useEffect, useState} from 'react';
import {LoadingIndicator, PageHeaderTitle, Text} from '..';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childStatsSelector,
  getChildStats as getChildStatsAPI,
} from '../../Redux';
import {COLORS} from '../../Constants';
import {
  Container,
  Root,
  StatsRow,
  StatsSpacer,
  Scroll,
  StatsViewItem,
  styles,
  StatsViewItemValueContainer,
} from './styles';

const StatsView = ({label, value}) => {
  return (
    <StatsViewItem>
      <Text
        style={styles.statsItemLabel}
        fontWeight="500"
        fontSize={14}
        textAlign="center"
        color={COLORS.White}>
        {label}
      </Text>
      <StatsViewItemValueContainer>
        <Text
          fontWeight="600"
          fontSize={32}
          textAlign="center"
          lineHeight={32}
          marginTop={10}
          marginBottom={4}
          color={COLORS.Green}>
          {value ?? 0}
        </Text>
        <Text
          marginBottom={15}
          fontWeight="400"
          fontSize={15}
          textAlign="center">
          STARS
        </Text>
      </StatsViewItemValueContainer>
    </StatsViewItem>
  );
};

const Statistics = () => {
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const childStats = useSelector(childStatsSelector);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getChildStats();
  }, []);

  const getChildStats = async () => {
    setIsLoading(true);
    await dispatch(getChildStatsAPI({childId}));
    setIsLoading(false);
  };

  return (
    <Root>
      <Scroll>
        <PageHeaderTitle
          onPressHelpButton={() => {}}
          title="Stats"
          subTitle="Setbacks are a way to help children learn from their mistakes and improve their behavior"
        />
        <Container>
          <StatsRow>
            <StatsView label="TODAY" value={childStats.today} />
            <StatsSpacer />
            <StatsView label="YESTERDAY" value={childStats.yesterday} />
          </StatsRow>
          <StatsRow>
            <StatsView label="THIS WEEK" value={childStats.thisWeek} />
            <StatsSpacer />
            <StatsView label="LAST WEEK" value={childStats.lastWeek} />
          </StatsRow>
          <StatsRow>
            <StatsView label="THIS MONTH" value={childStats.thisMonth} />
            <StatsSpacer />
            <StatsView label="LAST MONTH" value={childStats.lastMonth} />
          </StatsRow>
          <StatsRow>
            <StatsView
              label="YEAR TO DAY"
              value={childStats.yearToDate ?? ''}
            />
            <StatsSpacer />
            <StatsView label="LIFETIME" value={childStats.lifeTime ?? ''} />
          </StatsRow>
        </Container>
      </Scroll>
      {isLoading && <LoadingIndicator />}
    </Root>
  );
};

export {Statistics};
