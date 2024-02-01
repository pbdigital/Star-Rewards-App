import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'The field should have digits only');
});

export const addRewardValidationScheme = Yup.object().shape({
  name: Yup.string().required('Required'),
  starsNeededToUnlock: Yup.string().required('Required').integer(),
  emoji: Yup.string().required('Required'),
});

export const starAdjustmentValidationScheme = Yup.object().shape({
  selectedMode: Yup.string().required('Required').integer(),
  starQuantity: Yup.string().required('Required').integer(),
  reason: Yup.string().optional(),
});
