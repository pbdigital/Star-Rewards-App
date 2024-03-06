export const userInforSelector = ({user}) => user.info;
export const isAuthUserLoadingSelector = ({user}) => user?.isLoading;
export const isTutorialDoneSelector = ({user}) => user?.isDoneTutorial;
export const isReadOnlySelector = ({user}) => user?.isReadOnly;
