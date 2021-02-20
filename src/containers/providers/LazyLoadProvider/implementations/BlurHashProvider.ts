import path from 'path'
import { encode } from 'blurhash'
import sharp from 'sharp'

import uploadConfigs from '@configs/upload'
import ILazyLoadProvider from '../models/ILazyLoadProvider'

export default class BlurHashProvider implements ILazyLoadProvider {
  public async encode(image: string): Promise<string> {
    const hash: string = await new Promise((resolve, reject) => {
      sharp(path.resolve(uploadConfigs.tmpFolder, image))
        .raw()
        .ensureAlpha()
        .resize(32, 32, { fit: 'inside' })
        .toBuffer((err, buffer, { width, height }) => {
          if (err) return reject(err)

          const hash = encode(
            new Uint8ClampedArray(buffer),
            width,
            height,
            4,
            4
          )
          resolve(hash)
        })
    })

    return hash
  }
}
