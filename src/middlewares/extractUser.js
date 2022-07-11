import jwt from 'jsonwebtoken';

export async function extractToken (req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer', '').trim();
        if (!token) {
           return next();
        }
        const secretKey = process.env.JWT_SECRET;
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            req.user = decoded;
            next();
        });
    } catch (err) {
        console.log(err)
        res.status(500).send('Faça login novamente, por favor.');
    }
}