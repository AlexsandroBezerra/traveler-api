import { container } from 'tsyringe'

import uploadConfigs from '@configs/upload'

import DiskStorageProvider from './implementations/DiskStorageProvider'
import S3StorageProvider from './implementations/S3StorageProvider'
import IStorageProvider from './models/IStorageProvider'

const providers = {
  s3: S3StorageProvider,
  disk: DiskStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfigs.driver]
)
