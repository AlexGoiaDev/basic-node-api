/* THIS MUST BE THE DEV CONFIG DEFUALT */
module.exports = {
  port: 3000,
  host: 'pruebas-81i89.mongodb.net',
  db: 'test_base_node',
  dbUser: 'test_base_node',
  dbPassword: 'BpzKDHfwg5vgfgFx',
  secret: 'holimundi',
  expiration: 4200,
  maxTimeResetPass: 10,
  googleClientId: '535117363290-tco768uqho9hui9c1667fbs64crr6jok.apps.googleusercontent.com',
  /* Dev config */
  enabledLog: false,
  auth: true,
  roles: false,
  gmailAccount: 'alexgoiapsi@gmail.com',
  gmailPassword: 'Mcgnlmrsld!1991',
  recoverUrl: process.env.RECOVERY_URL || 'http://localhost:8080/#/reset-password/',
};
