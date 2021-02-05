const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || '123',
    expiresIn: '1d'
  }
}

export default authConfig
