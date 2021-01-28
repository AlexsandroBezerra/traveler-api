import { Ingest, Search } from 'sonic-channel'
import searcherConfig from '../../../../configs/searcher'

import IQueryDataDTO from '../dtos/IQueryDataDTO'
import ISaveDataDTO from '../dtos/ISaveDataDTO'
import ISearchProvider from '../models/ISearchProvider'

class SonicSearchProvider implements ISearchProvider {
  private sonicIngestor: Ingest
  private sonicSearcher: Search

  constructor() {
    this.sonicIngestor = new Ingest(searcherConfig).connect({})
    this.sonicSearcher = new Search(searcherConfig).connect({})
  }

  public async query({
    collection,
    bucket = 'default',
    terms
  }: IQueryDataDTO): Promise<string[]> {
    const result = await this.sonicSearcher.query(collection, bucket, terms, {
      lang: 'por'
    })

    return result
  }

  public async save({
    collection,
    bucket = 'default',
    result,
    searchable
  }: ISaveDataDTO): Promise<void> {
    if (result.indexOf(' ') >= 0) {
      throw new Error("result param can't have spaces")
    }

    await this.sonicIngestor.push(collection, bucket, result, searchable, {
      lang: 'por'
    })
  }
}

export default SonicSearchProvider
