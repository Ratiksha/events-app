import { ObjectId } from "mongodb";
import IconModel from "../../../models/IconModel";
import CryptoJS from 'crypto-js';

const IMAGE_ENCRYPTION_SECRET_KEY = process.env.NEXT_PUBLIC_IMAGE_ENCRYPTION_SECRET_KEY

const handler = async (req, res) => {
    try {
        const { ids } = req.body;

        const objectIds = ids.map(id => new ObjectId(id));
        const icons = await IconModel.find({ _id: { $in: objectIds }});

        const iconUrls = icons.map((icon) => {
            const encryptedUrl = CryptoJS.AES.encrypt(icon.svg, IMAGE_ENCRYPTION_SECRET_KEY).toString();
            return encryptedUrl;
        });

        res.status(200).json({ success: true, urls: iconUrls });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export default handler