// pages/api/checkout-session.ts
import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id as string, {
      expand: ['payment_intent'],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent & {
      charges: Stripe.ApiList<Stripe.Charge>;
    };

    const receiptUrl = paymentIntent.charges.data[0].receipt_url;

    res.status(200).json({ receipt_url: receiptUrl });
  } catch (err) {
    res.status(500).json({ error: 'Не вдалося отримати чек' });
  }
}
