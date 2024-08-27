import {authenticateUser, registerUser, getUser, getStatus} from '../controllers/authController.mjs'
import { checkSchema } from 'express-validator'
import { Router } from 'express'
import verifyToken from "../utils/customMiddlewares/jwt_middleware.mjs";
import { createUserValidationSchema } from '../validationSchemas/usersValidatorSchema.mjs'

const router = Router()

router.get('/api/auth/google/status', getStatus)

router.get('/api/auth/local/status',verifyToken , getUser)

router.post('/api/auth/reg', checkSchema(createUserValidationSchema), registerUser)

router.post('/api/auth/auth', authenticateUser)

export default router