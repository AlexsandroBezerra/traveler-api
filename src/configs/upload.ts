import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  tmpFolder: string
  uploadsFolder: string

  multer: multer.Options
}

const uploadConfig: IUploadConfig = {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, '..', 'public', 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_, file, callback) {
        const fileHash = crypto.randomBytes(6).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`.replace(/ /g, '-')

        return callback(null, fileName)
      }
    })
  }
}

export default uploadConfig
