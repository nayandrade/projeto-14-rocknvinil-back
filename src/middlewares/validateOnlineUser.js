import jwt from 'jsonwebtoken';
import { db }  from '../db.js';
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';

export async function validateOnlineUser(req, res, next) {
    const { authorization } = req.headers
    //const token = authorization?.replace('Bearer ', '');
    const token = authorization?.replace('Bearer ', '');
    const SECRET_KEY = process.env.JWT_SECRET;
    const userData = jwt.verify(token, SECRET_KEY);
    //console.log(userData)
    const userId = userData._id;
    //console.log(userId)
    try {
        const validUser = await db.collection('users').findOne({ _id: ObjectId(userId) });
        console.log(validUser)
        if(!validUser) {
            return res.status(401).send('User not found');
        }
        res.locals.userId = userId;
        res.locals.userNamer = validUser.name;
        
        next();

    } catch (error) {
        res.status(501).send(error);
    }
}
