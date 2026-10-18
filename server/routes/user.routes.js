
import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/users')
  .get(authCtrl.requireSignin, userCtrl.list)
  .post(userCtrl.create)
  .delete(authCtrl.requireSignin, userCtrl.removeAll)

router.route('/api/users')
  .get(authCtrl.requireSignin, userCtrl.list)
  .post(userCtrl.create)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.removeAll)
router.param('userId', userCtrl.userByID)

export default router
