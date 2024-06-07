import { ObjectId } from "mongodb";
import IconModel from "../../../models/IconModel";
import CryptoJS from 'crypto-js';
import UserModel from "../../../models/UserModel";
import { isAuthenticated } from "../../../utils/auth/isAuthenticated";

const IMAGE_ENCRYPTION_SECRET_KEY = process.env.NEXT_PUBLIC_IMAGE_ENCRYPTION_SECRET_KEY

const handler = async (req, res) => {
    try {
        const { ids } = req.body;

        const userId = await isAuthenticated(req, res);
        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
        }

        const objectIds = ids.map(id => new ObjectId(id));
        const icons = await IconModel.find({ _id: { $in: objectIds }});

        const stringIds = ids.map(id => id.toString());
        user.cart = user.cart.filter(itemId => !stringIds.includes(itemId.toString()));

        await user.save();

        const iconUrls = icons.map((icon) => {
            const encryptedUrl = CryptoJS.AES.encrypt(icon.svg, IMAGE_ENCRYPTION_SECRET_KEY).toString();
            return encryptedUrl;
        });

        res.status(200).json({ success: true, urls: iconUrls });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ success: false, error: error });
    }
}

export default handler