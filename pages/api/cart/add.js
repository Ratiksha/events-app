import UserModel from "../../../models/UserModel";
import { isAuthenticated } from "../../../utils/auth/isAuthenticated";

const handler = async (req, res) => {
    try {
        const userId = await isAuthenticated(req, res);
        const { id } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
        }
        user.cart.push(id);
        await user.save();
        res.status(200).json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ success: false, error: error });
    }
}

export default handler