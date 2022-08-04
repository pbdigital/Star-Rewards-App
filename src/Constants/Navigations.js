const navigationStackRoutes = {
  authNavigationStack: 'Auth Navigation Stack',
  rewardsStackNavigator: 'Reward Navigation Stack',
  newChildSetupStackNavigator: 'New Child Setup Stack',
  myAccountProfileStackNavigator: 'My Account Profile Stack',
};

const authenticationRoutes = {
  signup: 'Sign Up',
  login: 'Login',
  resetPassword: 'Reset Password',
};

const screenRoutes = {
  splash: 'Splash Screen',
  childNameInput: 'Child Name Input',
  chooseAvatar: 'Choose An Avatar',
  tasks: 'Tasks',
  addTasks: 'Add Tasks',
  home: 'Home',
  addBonusTasks: 'Add Bonus Tasks',
  settings: 'Settings',
  rewards: 'Rewards',
  addRewards: 'Add Rewards',
  settingsMyAccount: 'Settings My Account',
  myAccountUpdateName: 'My Account Update Name',
  myAccountChangeEmail: 'My Account Change Email',
  myAccountChangePassword: 'My Account Change Password',
  history: 'History',
};

export const NAV_ROUTES = {
  ...navigationStackRoutes,
  ...authenticationRoutes,
  ...screenRoutes,
};
