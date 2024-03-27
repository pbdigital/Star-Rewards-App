
import React, {createContext, useContext, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  childBonusTasksSelector,
  childListSelector,
  childRewardsTasksSelector,
  childSetbacksSelector,
} from 'AppReduxState';

const InAppPurchaseContext = createContext();

// TODO: Limit AD Hoc bonus task

const InAppPurchaseProvider = ({children}) => {
  const childList = useSelector(childListSelector);
  const bonusTasks = useSelector(childBonusTasksSelector);
  const rewardsTasks = useSelector(childRewardsTasksSelector);
  const setbacks = useSelector(childSetbacksSelector);

  const numberOfChildren = useMemo(() => childList.length, [childList]);
  const numberOfBonusTasks = useMemo(() => bonusTasks.length, [bonusTasks]);
  const numberOfRewardTasks = useMemo(
    () => rewardsTasks.length,
    [rewardsTasks],
  );
  const numberOfSetbacks = useMemo(() => setbacks.length, [setbacks]);

  const [isVip, setIsVip] = useState(true);
  return (
    <InAppPurchaseContext.Provider
      value={{
        isVip,
        numberOfChildren,
        numberOfBonusTasks,
        numberOfRewardTasks,
        numberOfSetbacks,
      }}>
      {children}
    </InAppPurchaseContext.Provider>
  );
};

const useInAppPurchaseProvider = () => {
  const context = useContext(InAppPurchaseContext);
  if (!context) {
    throw new Error(
      'useInAppPurchaseProvider must be used within InAppPurchaseContext',
    );
  }
  return context;
};

export {useInAppPurchaseProvider, InAppPurchaseProvider, InAppPurchaseContext};
