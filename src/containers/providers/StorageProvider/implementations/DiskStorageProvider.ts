import fs from 'fs'
import path from 'path'

import uploadConfigs from '@configs/upload'

import IStorageProvider from '../models/IStorageProvider'

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.copyFile(
      path.resolve(uploadConfigs.tmpFolder, file),
      path.resolve(uploadConfigs.uploadsFolder, file)
    )

    await fs.promises.unlink(path.resolve(uploadConfigs.tmpFolder, file))

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfigs.uploadsFolder, file)

    try {
      await fs.promises.unlink(filePath)
    } catch {}
  }
}
