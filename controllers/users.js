import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import ErrorResponse from '../utils/errorResponse.js';

let users = [];

export const getUsers = (req, res) => {
    res.status(200).send(users)
}

export const createUser = (req, res) => {
    const user = req.body;
    const newUser = { ...user, id: uuidv4() }
    users = [...users, newUser]
    res.status(200).send(newUser)
}

export const getUser = (req, res, next) => {
    const user = users.find(u => u.id === req.params.id);
    if(user){
        res.status(200).send(user)
    } else {
        return next(new ErrorResponse(`User with id ${req.params.id} not found`, 404))
    }
}

export const deleteUser = (req, res, next) => {
    const fUser = users.find(u => u.id === req.params.id);
    if(!fUser){
        return next(new ErrorResponse(`User with id ${req.params.id} not found`, 404))
    }
    const user = users.filter(u => u.id !== req.params.id);
    if(user){
        users = [ ...user]
        res.status(200).send('user deleted successfully')
    } else {
        return next(new ErrorResponse(`User with id ${req.params.id} not found`, 404))
    }
}

export const uploadImage = (req, res, next) => {
    const file = req.files.file;
    
    if(!file.mimetype.startsWith('image')){
       return next(new ErrorResponse('file format not supported', 500))
    }

    file.name = `photo_${uuidv4()}${path.parse(file.name).ext}`;
    file.mv(`./public/uploads/${file.name}`, async err => {
        if(err){
            console.log(err);
        }

        res.status(200).send(file.name);
    })
} 