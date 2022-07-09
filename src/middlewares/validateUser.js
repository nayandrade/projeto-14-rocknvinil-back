import jwt from 'jsonwebtoken';

export async function requireUser (req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).send('Token not provided.')
        } else {
            next();
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Faça login novamente, por favor.');
    }
}