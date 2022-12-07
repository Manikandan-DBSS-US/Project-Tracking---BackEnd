import express from 'express';
import { deleteUser, getAccessToken, getAlluser, getSpecificUser, login, logout, register, updateUser } from '../controller/authController.js';

const router  = express.Router();


router.route("/").get(getAlluser)
router.route("/:id").get(getSpecificUser).put(updateUser).delete(deleteUser)
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh_token').post(getAccessToken);
router.route('/logout').get(logout);

export default router;