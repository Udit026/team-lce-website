import { Router } from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import { listUsers, createUser, updateUser, resetPassword, deleteUser } from '../controllers/userController.js'

const r = Router()
r.use(protect, adminOnly) // is file ke saare routes sirf admin ke liye
r.route('/').get(listUsers).post(createUser)
r.route('/:id').put(updateUser).delete(deleteUser)
r.put('/:id/password', resetPassword)
export default r