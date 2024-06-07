import Stripe from 'stripe';
import PaymentModel from '../../models/PaymentModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const secret = process.env.STRIPE_WEBHOOK_SECRET_KEY || "";

const buffer = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    req.on('error', reject);
  });
};

let event;
let paymentIntent = {};
let metadata = {};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const body = await buffer(req);
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(body, signature, secret);
    } catch (err) {
      console.error('Error verifying webhook signature', err);
      return res.status(400).end();
    }

    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        console.log('checkoutSessionAsyncPaymentFailed', checkoutSessionAsyncPaymentFailed)
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        console.log('checkoutSessionAsyncPaymentSucceeded', checkoutSessionAsyncPaymentSucceeded)
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        metadata = checkoutSessionCompleted.metadata;
        console.log('checkoutSessionCompleted', checkoutSessionCompleted)
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        console.log('paymentIntentPaymentFailed', paymentIntentPaymentFailed)
        console.log('metadata', metadata)
        break;
      case 'payment_intent.succeeded':
        paymentIntent = event.data.object;
        console.log('paymentIntent', paymentIntent)
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    if (paymentIntent && metadata.userId && metadata.iconIds) {
      const arrayIconIds = metadata.iconIds.split(',');
      const existingPayment = await PaymentModel.findOne({ paymentId: paymentIntent.id });
      console.log('created before', paymentIntent.created)
      const createdDate = new Date(paymentIntent.created * 1000);
      console.log('created after', createdDate)
      const formattedDate = createdDate.toLocaleString();
      console.log('formattedDate', formattedDate)
      const formattedAmount = paymentIntent.amount / 100;
      console.log('formattedAmount', formattedAmount)
      if (existingPayment === null || existingPayment === undefined) {
        const paymentData = {
            paymentId: paymentIntent.id,
            user: metadata.userId,
            icons: arrayIconIds,
            amount: formattedAmount,
            currency: paymentIntent.currency,
            customerId: paymentIntent.customer,
            paymentStatus: paymentIntent.status,
            clientSecret: paymentIntent.client_secret,
            iconsDownloaded: false,
            createdAt: createdDate
        };

        // Create a new entry in the database
        await PaymentModel.create(paymentData);
    }
    }
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;
