import { Options } from 'sonic-channel'

const searcherConfig: Options = {
  host: process.env.SONIC_HOST || 'localhost',
  port: 1491,
  auth: process.env.SONIC_PASSWORD
}

export default searcherConfig
