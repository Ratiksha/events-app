import { hash } from 'bcryptjs';
import connectDB from "../../lib/connectDB";
import UserModel from '../../../models/UserModel';

const signup = async (req, res) => {
    try {
        await connectDB();

        const { username, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'Email already registered'});
        }

        const newUser = {
            username,
            email,
            password: hashedPassword
        }

        const retrievedUser = await UserModel.create(newUser);
        res.status(200).json({ 
            message: 'User registered successfully',
            user: {
                username: retrievedUser.username,
                email: retrievedUser.email
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

export default signup;