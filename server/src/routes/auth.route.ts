import express from 'express'
import { login, signup, logout } from '../controllers/auth.controller'
import { protect } from '../middleware/auth.middleware'
import { authorized } from '../middleware/role.middleware'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get('/admin', protect, authorized('admin'), (req, res) => {
    res.json({
        message: "Admin Dashboard"
    })
})


router.get('/user', protect, authorized('user', 'admin'), (req, res) => {
    res.json({
        message: "User Dashboard"
    })
})


export default router;