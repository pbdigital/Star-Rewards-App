module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          Assets: './src/Assets',
          Components: './src/Components',
          Constants: './src/Constants',
          FormValidations: './src/FormValidations',
          Helpers: './src/Helpers',
          Navigations: './src/Navigations',
          Redux: './src/Redux',
          Screens: './src/Screens',
          Services: './src/Services',
          Validations: './src/Validations',
        },
      },
    ],
  ],
};
