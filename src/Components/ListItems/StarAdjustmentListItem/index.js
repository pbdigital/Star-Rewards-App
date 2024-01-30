import React, {forwardRef, useCallback} from 'react';
import {COLORS} from 'Constants';
import {Images} from 'Assets/Images';
import {Text} from '../../Text';
import {
  Container,
  Details,
  BonusStarInfo,
  Padded,
  TopContent,
  BottomContent,
  StarContainer,
  Root,
} from './styles';

const StarAdjustmentListItem = forwardRef(
  ({id, childId, marginTop, marginBottom}, ref) => {
    const renderItem = useCallback(() => {
      return (
        <Padded>
          <Container>
            <Details>
              <TopContent>
                <Text
                  fontSize={16}
                  fontWeight="500"
                  lineHeight={24}
                  color={COLORS.Text.black}>
                  January 23, 2024
                </Text>
                <StarContainer>
                  <BonusStarInfo source={Images.Star} />
                  <Text
                    fontSize={16}
                    fontWeight="600"
                    lineHeight={24}
                    marginLeft={8}
                    color={COLORS.Red}>
                    -50
                  </Text>
                </StarContainer>
              </TopContent>
              <BottomContent>
                <Text
                  fontSize={13}
                  fontWeight="400"
                  lineHeight={20}
                  color="#94989B">
                  Old Star Count: 200
                </Text>
                <Text
                  fontSize={13}
                  fontWeight="400"
                  lineHeight={20}
                  color="#94989B">
                  New Star Count: 200
                </Text>
              </BottomContent>
            </Details>
          </Container>
        </Padded>
      );
    }, []);

    return (
      <Root
        ref={ref}
        key={`${id}-star-adjustments`}
        marginTop={marginTop}
        marginBottom={marginBottom}>
        {renderItem()}
      </Root>
    );
  },
);

export {StarAdjustmentListItem};
