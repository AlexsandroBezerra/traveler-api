import { Ingest } from 'sonic-channel'
import searcherConfig from '../../../configs/searcher'

import ISaveDataDTO from '../dtos/ISaveDataDTO'
import ISearchProvider from '../models/ISearchProvider'

class SonicSearchProvider implements ISearchProvider {
  private sonicIngestor: Ingest

  constructor() {
    this.sonicIngestor = new Ingest(searcherConfig).connect({})
  }

  async save({
    collection,
    bucket = 'default',
    result,
    searchable
  }: ISaveDataDTO): Promise<void> {
    if (result.indexOf(' ') >= 0) {
      throw new Error("result param can't have spaces")
    }

    console.log({
      collection,
      bucket,
      result,
      searchable
    })

    await this.sonicIngestor.push(collection, bucket, result, searchable)
  }
}

export default SonicSearchProvider
