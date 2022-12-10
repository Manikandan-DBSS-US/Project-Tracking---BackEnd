import express from 'express';
import { deleteUser, getAccessToken, getAlluser, getSpecificUser, login, logout, register, updateUser } from '../controller/authController.js';
import auth from '../middleware/auth.js';

const router  = express.Router();


router.route("/").get(auth,getAlluser)
router.route("/:id").get(auth,getSpecificUser).put(auth,updateUser).delete(auth,deleteUser)
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh_token').post(getAccessToken);
router.route('/logout').get(logout);

export default router;