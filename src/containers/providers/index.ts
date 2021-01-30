import { container } from 'tsyringe'

import SonicSearchProvider from './SearchProvider/implementations/SonicSearchProvider'
import ISearchProvider from './SearchProvider/models/ISearchProvider'

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'
import IStorageProvider from './StorageProvider/models/IStorageProvider'

container.registerSingleton<ISearchProvider>(
  'SearchProvider',
  SonicSearchProvider
)

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
