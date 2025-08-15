// src/app/success/page.tsx
import Stripe from 'stripe';
import Image from 'next/image';
import FallingLeaves from '../components/FallingLeaves';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export default async function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <FallingLeaves />
        <h1>❌ Sorry</h1>
      </div>
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent.charges'],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
    const chargeId = paymentIntent.latest_charge as string;
    const charge = chargeId ? await stripe.charges.retrieve(chargeId) : null;

    if (!charge?.receipt_url) {
      return (
        <div className='success'>
            <FallingLeaves />
            <h1 className='success_title'> Thank you for the payment! ✅</h1>
            <img src="/party.png" alt="Payment Success" />
        </div>
      );
    }

    return (
        <div className='success'>
            <FallingLeaves />
            <h1 className='success_title'> Thank you for the payment! ✅</h1>
            <a href={charge.receipt_url} target="_blank" rel="noopener noreferrer" className='cancel_button'>
                Viev receipt 📄        
            </a>
            <img src="/party.png" alt="Payment Success" />
        </div>
    );
  } catch (err) {
    return (
        <div className='success'>
            <FallingLeaves />
            <h1 className='success_title'> Thank you for the payment! ✅</h1>
            <img src="/party.png" alt="Payment Success" />
        </div>
    );
  }
}
