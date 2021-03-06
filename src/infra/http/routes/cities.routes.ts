import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'

import uploadConfigs from '@configs/upload'
import CitiesController from '../controllers/CitiesController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const citiesRouter = Router()
const citiesController = new CitiesController()

const upload = multer(uploadConfigs.multer)

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
  '/:slug',
  celebrate({
    [Segments.PARAMS]: {
      slug: Joi.string().required()
    }
  }),
  citiesController.show
)

citiesRouter.post(
  '/:slug/access',
  celebrate({
    [Segments.PARAMS]: {
      slug: Joi.string().required()
    }
  }),
  citiesController.access
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

citiesRouter.patch(
  '/:slug/image',
  upload.single('image'),
  celebrate({
    [Segments.PARAMS]: {
      slug: Joi.string().required()
    }
  }),
  citiesController.image
)

export default citiesRouter
