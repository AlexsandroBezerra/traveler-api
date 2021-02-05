interface IAuthConfigs {
  jwt: {
    secret: string
    expiresIn: string
  }

  admin: {
    secret: string | undefined
  }
}

const authConfigs: IAuthConfigs = {
  jwt: {
    secret: process.env.APP_SECRET || '123',
    expiresIn: '1d'
  },

  admin: {
    secret:
      process.env.NODE_ENV === 'production'
        ? process.env.APP_ADMIN_SECRET
        : undefined
  }
}

export default authConfigs
