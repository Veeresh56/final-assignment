export const authConfig = {
  issuer: "https://idbi-auth-stage.isupay.in/application/o/idbi/",
  authorizationEndpoint: "https://idbi-auth-stage.isupay.in/application/o/authorize/",
  tokenEndpoint: "https://idbi-auth-stage.isupay.in/application/o/token/",

  clientId: "h0xLFWq1FS6uHKVwk",

  redirectUri: "http://localhost:3000/redirected",

  scopes: [
    "openid",
    "profile",
    "email",
    "offline_access",
    "authorities",
    "privileges",
    "user_name",
    "created",
    "adminName",
    "bankCode",
    "goauthentik.io/api",
  ],
};