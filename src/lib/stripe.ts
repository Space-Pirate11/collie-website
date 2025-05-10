import { loadStripe } from '@stripe/stripe-js';
import { products } from '../stripe-config';

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(
  priceId: string,
  mode: 'payment' | 'subscription',
  token: string | null,
  successUrl: string,
  cancelUrl: string,
) {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    const { error } = await stripe.redirectToCheckout({
      mode,
      lineItems: [{ price: priceId, quantity: 1 }],
      successUrl,
      cancelUrl,
    });

    if (error) {
      throw error;
    }

    // The redirect will happen automatically, but we return null to satisfy TypeScript
    return null;
  } catch (error) {
    console.error('Detailed checkout error:', error);
    throw error;
  }
}

export function getProductByPriceId(priceId: string) {
  return Object.values(products).find((product) => product.priceId === priceId);
}