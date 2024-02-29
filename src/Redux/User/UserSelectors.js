export const userInforSelector = ({user}) => user.info;
export const isAuthUserLoadingSelector = ({user}) => user?.isLoading;
export const isTutorialDoneSelector = ({user}) => user?.isDoneTutorial;
export const authenticatedUserTypeSelector = ({user}) =>
  user?.authenticatedUserType;
export const isReadOnlySelector = ({user}) => user?.isReadOnly;
