/* THIS MUST BE THE DEV CONFIG DEFUALT */
module.exports = {
  port: 3000,
  host: 'pruebas-81i89.mongodb.net',
  db: 'test_base_node',
  dbUser: 'test_base_node',
  dbPassword: 'BpzKDHfwg5vgfgFx',
  secret: 'holimundi',
  expiration: 4200,
  maxTimeResetPass: 1,
  googleClientId: '535117363290-tco768uqho9hui9c1667fbs64crr6jok.apps.googleusercontent.com',
  /* Dev config */
  enabledLog: false,
  auth: false,
  roles: false,
  spotifyAuthUrl: 'https://accounts.spotify.com/api/token',
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID || '277cf54305d644cda3ff397982eca9f1',
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || '9527a00d199a46eab01e453bc3d678cd',
  spotifyCallbackUri: process.env.SPOTITY_CALLBACL_URI || 'https://hellomanito.netlify.com/',

};
