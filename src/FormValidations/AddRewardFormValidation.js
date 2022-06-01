import * as Yup from 'yup';

export const addRewardValidationScheme = Yup.object().shape({
  name: Yup.string().required('Required'),
  starsNeededToUnlock: Yup.string().required('Required'),
  emoji: Yup.string().required('Required'),
});
