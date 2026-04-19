const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { items } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Cart is empty' }) };
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    // Flat shipping: free over $100, $8 for $75+, $12 otherwise
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    if (subtotal < 100) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Shipping & Handling' },
          unit_amount: subtotal >= 75 ? 800 : 1200,
        },
        quantity: 1,
      });
    }

    const baseUrl = process.env.URL || 'https://blueloustudios.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/shop.html`,
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      billing_address_collection: 'auto',
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Stripe error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
