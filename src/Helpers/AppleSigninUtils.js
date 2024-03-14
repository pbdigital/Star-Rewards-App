import jwt_decode from 'jwt-decode';

export const generateAppleAuthParams = appleAuthRequestResponse => {
  const {
    fullName,
    authorizationCode: code,
    identityToken: id_token,
    state,
  } = appleAuthRequestResponse;
  const {givenName: firstName, familyName: lastName} = fullName;
  const {email} = jwt_decode(appleAuthRequestResponse?.identityToken);
  return {
    authorization: {
      state,
      code,
      id_token,
    },
    user: {
      email,
      name: {
        firstName,
        lastName,
      },
    },
  };
};
