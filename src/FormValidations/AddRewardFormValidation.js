import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'The field should have digits only');
});

export const addRewardValidationScheme = Yup.object().shape({
  name: Yup.string().required('Required'),
  starsNeededToUnlock: Yup.string().required('Required').integer(),
  emoji: Yup.string().required('Required'),
});
