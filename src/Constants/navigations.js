const navigationStackRoutes = {
  authNavigationStack: 'Auth Navigation Stack',
  rewardsStackNavigator: 'Reward Navigation Stack',
  newChildSetupStackNavigator: 'New Child Setup Stack',
};

const authenticationRoutes = {
  signup: 'Sign Up',
  login: 'Login',
};

const screenRoutes = {
  childNameInput: 'Child Name Input',
  chooseAvatar: 'Choose An Avatar',
  tasks: 'Tasks',
  addTasks: 'Add Tasks',
  home: 'Home',
  addBonusTasks: 'New Child Setup Stack',
};

export const NAV_ROUTES = {
  ...navigationStackRoutes,
  ...authenticationRoutes,
  ...screenRoutes,
};
