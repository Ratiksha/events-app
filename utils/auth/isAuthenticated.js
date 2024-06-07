import jwt from 'jsonwebtoken';

const AUTHORIZATION_SECRET_KEY = process.env.AUTHORIZATION_SECRET_KEY

export const isAuthenticated = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return 'Authorization header missing or malformed';
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, AUTHORIZATION_SECRET_KEY);
        return decoded.userId;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ success: false, error: 'Session Expired. Sign In to continue.', redirectTo: '/signin' });
          } else {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
          }
    }
};