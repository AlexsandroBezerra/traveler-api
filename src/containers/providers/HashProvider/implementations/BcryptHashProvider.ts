import bcrypt from 'bcryptjs'

import IHashProvider from '../models/IHashProvider'

class BCryptHashProvider implements IHashProvider {
  public generateHash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 7)
  }

  public compareHash(payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash)
  }
}

export default BCryptHashProvider
