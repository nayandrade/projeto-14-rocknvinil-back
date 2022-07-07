import jwt from 'jsonwebtoken';

export default async function validateSupplier (req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer', '').trim();
        const secretKey = process.env.JWT_SECRET;
        const validSupplier = jwt.verify(token, secretKey);

        if(!validSupplier) {
            return res.sendStatus(401);
        };
        req.supplierId = decoded.id;
        next();
    } catch (err) {
        res.status(500).send('Faça login novamente, por favor.');
    }
}