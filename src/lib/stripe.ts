import { products } from '../stripe-config';

export async function createCheckoutSession(
  priceId: string,
  mode: 'payment' | 'subscription',
  token: string | null,
  successUrl: string,
  cancelUrl: string,
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        price_id: priceId,
        mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Checkout error response:', errorData);
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const { url } = await response.json();
    if (!url) {
      throw new Error('No checkout URL returned from server');
    }

    return url;
  } catch (error) {
    console.error('Detailed checkout error:', error);
    throw error;
  }
}

export function getProductByPriceId(priceId: string) {
  return Object.values(products).find((product) => product.priceId === priceId);
}