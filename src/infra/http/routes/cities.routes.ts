import { Router } from 'express'
import multer from 'multer'

import CitiesController from '../controllers/CitiesController'
import uploadConfig from '@configs/upload'

const citiesRouter = Router()
const citiesController = new CitiesController()

const upload = multer(uploadConfig.multer)

citiesRouter.get('/', citiesController.index)
citiesRouter.get('/:id', citiesController.show)
citiesRouter.get('/search', citiesController.search)
citiesRouter.post('/', upload.single('image'), citiesController.create)

export default citiesRouter
