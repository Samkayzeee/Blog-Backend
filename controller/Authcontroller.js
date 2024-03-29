import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    try {
        const token = String(req.headers['authorization']).split(' ')[1]
        if(!token) return res.status(401).send("Access Denied(Token not found)")

        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user
        next();
    } catch (error) {
        res.status(403).send("Invalid Token");
    }
}