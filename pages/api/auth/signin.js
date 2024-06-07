import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../../../models/UserModel';

const AUTHORIZATION_SECRET_KEY = process.env.AUTHORIZATION_SECRET_KEY

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }
        const token = jwt.sign({ userId: user.id }, AUTHORIZATION_SECRET_KEY, { expiresIn: '1h'});
        res.status(200).json({ 
            token, 
            isLoggedIn: true,
            user: { 
                id: user._id, 
                username: user.username,
                email: user.email
            } 
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default signin;