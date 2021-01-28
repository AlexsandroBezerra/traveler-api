import { Options } from 'sonic-channel'

const searcherConfig: Options = {
  host: 'traveler-searcher',
  port: 1491,
  auth: process.env.SONIC_PASSWORD
}

export default searcherConfig
