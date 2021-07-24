const FIFTEEN_MINUTES = 60 * 15

export const authConfigs = {
  jwt: {
    secret: process.env.APP_SECRET || "my-secret",
    expiresIn: FIFTEEN_MINUTES,
  }
};
