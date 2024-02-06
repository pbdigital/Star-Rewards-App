const navigationStackRoutes = {
  authNavigationStack: 'Auth Navigation Stack',
  newChildSetupStackNavigator: 'New Child Setup Stack',
  myAccountProfileStackNavigator: 'My Account Profile Stack',
  bottomTabNavigator: 'Bottom Tab Navigation',
  starRewardsStackNavigator: 'Star Rewards Stack Navigator',
  bonusStarsStackNavitagor: 'Bonus Stars Stack Navigator',
  rewardsStackNavigator: 'Rewards Stack Navigator',
  settingsStackNavigator: 'Settings Stack Navigator',
  starSetbackStackNavigator: 'Star Setback Stack Navigator',
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
  spinWheel: 'Spin Wheel',
  starRewards: 'Star Rewards',
  bonusStars: 'Bonus Stars',
  welcomeAboard: 'Welcome Aboard',
  quickTutorial: 'Quick Tutorial',
  setbacks: 'Setbacks',
  addSetbackBehaviorScreen: 'AddSetbackBehaviorScreen',
  starsAdjustmentDetails: 'Stars Adjustment Details',
  starsAdjustmentForm: 'Stars Adjustment Form',
  oneOffStars: 'One Off Stars',
};

export const NAV_ROUTES = {
  ...navigationStackRoutes,
  ...authenticationRoutes,
  ...screenRoutes,
};
