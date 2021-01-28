import ISaveDataDTO from '../dtos/ISaveDataDTO'

interface ISearchProvider {
  save(saveData: ISaveDataDTO): Promise<void>
}

export default ISearchProvider
