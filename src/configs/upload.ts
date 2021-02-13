import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfigs {
  tmpFolder: string
  uploadsFolder: string

  driver: 's3' | 'disk'

  multer: multer.Options

  aws: {
    bucket: string
  }
}

const uploadConfigs: IUploadConfigs = {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, '..', 'public', 'uploads'),

  driver: process.env.NODE_ENV === 'production' ? 's3' : 'disk',

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_, file, callback) {
        const fileHash = crypto.randomBytes(6).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`.replace(/ /g, '-')

        return callback(null, fileName)
      }
    })
  },

  aws: {
    bucket: 'alex-traveler'
  }
}

export default uploadConfigs
