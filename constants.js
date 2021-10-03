module.exports = {
  NUMBER_PER_PAGE:20,
  Messages: {
    USER_INPUT_ERROR: {
      NONE_FIELDS_AVAILABLE: "Atleast one field is required!",
      NOT_ALL_FIELDS_AVAILABLE: "All fields are required!",
    },
    USER: {
      CREATION_ERROR: "Some error occurred while creating the User.",
      EMAIL_ALREADY_EXISTS: "Account already exist with this email",
      MOBILE_ALREADY_EXISTS: "Account already exist with this mobile",
      INVALID_CREDS: "Invalid credentials!",
      ACCOUNT_NOT_FOUND: "Account does not exists!",
      PROFILE: {
        GET_ERROR: "Some error occurred while getting the profile.",
      },
    },
    AUTH: {
      TOKEN_UNAVAILABLE: "A token is required for authentication",
      INVALID_TOKEN: "Invalid Token",
    },
  },
  JWT_CONFIG: {
    ISSUER: "TestIssuer",
    SUBJECT: "some@user.com",
    AUDIENCE: "http://Test.in",
    ALOGO: "RS256",
    TOKEN: {
      VALIDITY: "100h",
      RESET_VALIDITY: "1h",
    },
  },
};
