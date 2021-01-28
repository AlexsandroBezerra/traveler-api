import IQueryDataDTO from '../dtos/IQueryDataDTO'
import ISaveDataDTO from '../dtos/ISaveDataDTO'

interface ISearchProvider {
  query(queryData: IQueryDataDTO): Promise<string[]>
  save(saveData: ISaveDataDTO): Promise<void>
}

export default ISearchProvider
