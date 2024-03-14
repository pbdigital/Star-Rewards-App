module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          Assets: './src/Assets',
          Components: './src/Components',
          ContextProviders: './src/ContextProviders',
          Constants: './src/Constants',
          FormValidations: './src/FormValidations',
          Helpers: './src/Helpers',
          Navigations: './src/Navigations',
          AppReduxState: './src/AppReduxState',
          Screens: './src/Screens',
          Services: './src/Services',
          Validations: './src/Validations',
        },
      },
    ],
  ],
};
