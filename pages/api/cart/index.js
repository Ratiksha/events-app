import UserModel from "../../../models/UserModel";
import { isAuthenticated } from "../../../utils/auth/isAuthenticated";

const handler = async (req, res) => {
    try {
        const userId = await isAuthenticated(req, res);
        const user = await UserModel.findById(userId).populate('cart');
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
        }
        const cart = user.cart;
        res.status(200).json({ success: true, cart: cart });
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ success: false, error: error });
    }
}

export default handler