import express from 'express';
import { getUsers, createUser, getUser, deleteUser, uploadImage } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers)

router.post('/', createUser);

router.get('/:id', getUser )

router.post('/image', uploadImage )

router.delete('/:id', deleteUser )

export default router;