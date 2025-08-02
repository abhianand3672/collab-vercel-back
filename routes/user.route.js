import express from 'express';
import { registerUser, getUserProfile, getBasicUserInfo, getAllRegisteredUsers, deleteUserProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/register', verifyToken, registerUser);
router.get('/profile', verifyToken, getUserProfile);
router.get('/basic', verifyToken, getBasicUserInfo);
router.get('/all-registered', verifyToken, getAllRegisteredUsers);
router.delete('/profile', verifyToken, deleteUserProfile);

export default router;