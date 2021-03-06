import { container } from 'tsyringe'

import BCryptHashProvider from './HashProvider/implementations/BcryptHashProvider'
import IHashProvider from './HashProvider/models/IHashProvider'
import BlurHashProvider from './LazyLoadProvider/implementations/BlurHashProvider'
import ILazyLoadProvider from './LazyLoadProvider/models/ILazyLoadProvider'

import SonicSearchProvider from './SearchProvider/implementations/SonicSearchProvider'
import ISearchProvider from './SearchProvider/models/ISearchProvider'

import './StorageProvider'

container.registerSingleton<ISearchProvider>(
  'SearchProvider',
  SonicSearchProvider
)

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)

container.registerSingleton<ILazyLoadProvider>(
  'LazyLoadProvider',
  BlurHashProvider
)
