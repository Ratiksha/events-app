import Stripe from 'stripe';
import UserModel from "../../../models/UserModel";
import { isAuthenticated } from "../../../utils/auth/isAuthenticated";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
    try {
        const userId = await isAuthenticated(req, res);
        const user = await UserModel.findById(userId);

        const { icons } = req.body;
        const defaultAddress = {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                };

        const customer = await stripe.customers.create({
                name: user.username,
                address: defaultAddress,
                email: user.email
            });

        const lineItems = icons.map(icon => ({
            price_data: {
                currency: 'usd',
                unit_amount: icon.price * 100,
                product_data: {
                    name: icon.name,
                },
            },
            quantity: 1,
        }));

        const iconIds = icons.map(icon => icon._id);

        const checkOutSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            customer: customer.id,
            success_url: `http://localhost:3000/success?customerId=${customer.id}`,
            cancel_url: `http://localhost:3000/`,
            line_items: lineItems,
            metadata: {
                iconIds: iconIds.join(','),
                userId: userId,
            }
        });

        res.status(200).json({ 
            success: true,
            msg: checkOutSession, 
            url: checkOutSession.url
        });
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ success: false, error: error });
    }
}

export default handler;