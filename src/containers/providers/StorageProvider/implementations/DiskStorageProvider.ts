import fs from 'fs'
import path from 'path'

import uploadConfig from '@configs/upload'

import IStorageProvider from '../models/IStorageProvider'

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.copyFile(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    )

    await fs.promises.unlink(path.resolve(uploadConfig.tmpFolder, file))

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file)

    try {
      await fs.promises.unlink(filePath)
    } catch {}
  }
}
