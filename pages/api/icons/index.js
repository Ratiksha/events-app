import { ITEMS_PER_PAGE } from "../../../src/utils/constants";
import connectDB from "../../lib/connectDB";
import IconModel from "../../../models/IconModel";

const handler = async (req, res) => {
    try {
        await connectDB();

        const searchTerm = req.query.searchTerm;
        let icons;
        let iconsCount;

        if (searchTerm) {
            const regex = new RegExp(searchTerm, 'i');
            icons = await IconModel.find({ tags: { $elemMatch: { $regex: regex } } });
            iconsCount = icons.length;
        } else {
            const page = parseInt(req.query.page) || 1;
            const skip = (page - 1) * ITEMS_PER_PAGE;
            icons = await IconModel.find({}, { "svg": 0 }).skip(skip).limit(ITEMS_PER_PAGE);
            iconsCount = await IconModel.countDocuments({});
        }
        res.status(200).json({ icons, iconsCount });
    } catch (error) {
        console.error('Error fetching icons:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export default handler