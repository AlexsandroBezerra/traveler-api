import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@configs/upload'
import CitiesController from '../controllers/CitiesController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const citiesRouter = Router()
const citiesController = new CitiesController()

const upload = multer(uploadConfig.multer)

citiesRouter.get('/', citiesController.index)

citiesRouter.get(
  '/search',
  celebrate({
    [Segments.QUERY]: {
      q: Joi.string().required()
    }
  }),
  citiesController.search
)

citiesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  citiesController.show
)

citiesRouter.use(ensureAuthenticated)

citiesRouter.post(
  '/',
  upload.single('image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      famousFor: Joi.string().required()
    }
  }),
  citiesController.create
)

export default citiesRouter
