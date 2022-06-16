import * as Yup from 'yup';

export const emailRule = Yup.string()
  .email('Invalid email address')
  .required('Email address is required.');

export const firstNameRule = Yup.string()
  .min(2, 'First name should have at least be 3 characters.')
  .max(30, 'First name should have a maximum of 30 characters.')
  .required('Required');

export const passwordRule = Yup.string()
  .min(6, 'Password must contain at least 8 characters.')
  .max(30, 'Password must not exceed to 30 characters.')
  .required('Required');

export const confirmPasswordRule = Yup.string().test(
  'passwords-match',
  'Passwords must match',
  function (value) {
    return this.parent.password === value;
  },
);

export const confirmEmailRule = Yup.string().test(
  'passwords-match',
  'Email must match',
  function (value) {
    return this.parent.newEmail === value;
  },
);

export const SignUpSchema = Yup.object().shape({
  firstName: firstNameRule,
  email: emailRule,
  password: passwordRule,
  confirmPassword: confirmPasswordRule,
});

export const LoginSchema = Yup.object().shape({
  email: emailRule,
  password: passwordRule,
});

export const UpdateEmailScheme = Yup.object().shape({
  email: emailRule,
  newEmail: emailRule,
  confirmEmail: confirmEmailRule,
});

export const UpdatePasswordScheme = Yup.object().shape({
  password: passwordRule,
  confirmPassword: confirmPasswordRule,
});
