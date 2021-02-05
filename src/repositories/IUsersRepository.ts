import User from '@infra/database/entities/User'

import ICreateUserDTO from '@dtos/ICreateUserDTO'

interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
}

export default IUsersRepository
