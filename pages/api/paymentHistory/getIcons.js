import PaymentModel from "../../../models/PaymentModel";
import UserModel from "../../../models/UserModel";
import { isAuthenticated } from "../../../utils/auth/isAuthenticated";

const handler = async (req, res) => {
    try {
        const userId = await isAuthenticated(req, res);
        const user = await UserModel.findById(userId);
        const { id } = req.body;
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
        }

        const paymentHistory = await PaymentModel.find({ customerId: id }).populate({
            path: 'icons',
            select: '_id'
        });

        

        console.log('paymentHistory', paymentHistory)
        
        res.status(200).json({ 
            success: true,
            paymentHistory: paymentHistory,
        });
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ success: false, error: error });
    }
}

export default handler;