import jwt from 'jsonwebtoken';

export async function validateSupplier (req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer', '').trim();
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        const secretKey = process.env.JWT_SECRET;
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            req.supplierId = decoded.id;
            next();
        });
    } catch (err) {
        res.status(500).send('Faça login novamente, por favor.');
    }
}