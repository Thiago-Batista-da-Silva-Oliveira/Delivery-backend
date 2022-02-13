import {Router} from 'express'
import { HandleDistanceController } from './controllers/HandleDistanceController'

const router = Router()

router.post("/distance", new HandleDistanceController().handle)

export {router}