import { container } from 'tsyringe'

import SonicSearchProvider from './SearchProvider/implementations/SonicSearchProvider'
import ISearchProvider from './SearchProvider/models/ISearchProvider'

container.registerSingleton<ISearchProvider>(
  'SearchProvider',
  SonicSearchProvider
)
