import express from 'express'
import { login, signup, logout, getMe } from '../controllers/auth.controller'
import { protect } from '../middleware/auth.middleware'
import { authorized } from '../middleware/role.middleware'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get('/user', protect, getMe)


export default router;