import express from 'express';
import { getAccessToken, login, logout, register } from '../controller/authController.js';

const router  = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh_token').post(getAccessToken);
router.route('/logout').get(logout);

export default router;