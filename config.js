/* THIS MUST BE THE DEV CONFIG DEFUALT */
module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'pruebas-81i89.mongodb.net',
  DB: process.env.DB || 'test_base_node',
  DB_USER: process.env.DB_USER || 'test_base_node',
  DB_PASSWORD: process.env.DB_PASSWORD || 'BpzKDHfwg5vgfgFx',
  secret: process.env.SECRET || 'holimundi',
  expiration: process.env.EXPIRATION || 4200,
  maxTimeResetPass: 10,
  googleClientId: process.env.GOOGLE_CLIENT_ID || '535117363290-tco768uqho9hui9c1667fbs64crr6jok.apps.googleusercontent.com',
  gmailAccount: process.env.GMAIL_ACCOUNT || 'alexgoiapsi@gmail.com',
  gmailPassword: process.env.GMAIL_PASSWORD || 'Mcgnlmrsld!1991',
  recoverUrl: process.env.RECOVERY_URL || 'http://localhost:8080/#/reset-password/',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_9MdSDo6IcMlWz9ufFW1S6yMu00ObTBjlVb',
  stripeProduct: process.env.STRIPE_PLAN || 'prod_HClc1tdSzlIosg',
  /* Dev config */
  enabledLog: false,
  auth: true,
  roles: false,
};
