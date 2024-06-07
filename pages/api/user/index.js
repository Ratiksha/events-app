import UserModel from "../../../models/UserModel";
import { isAuthenticated } from "../../../utils/auth/isAuthenticated";

const handler = async (req, res) => {
    try {
        const userId = await isAuthenticated(req, res);
        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ 
            isLoggedIn: true,
            user: { 
                id: user._id, 
                username: user.username,
                email: user.email
            } 
        });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ success: false, error: error });
    }
}

export default handler