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

    // Category-based shipping rates (US):
    //   Pottery:  $12, free ≥ $150
    //   Supplies: $5,  free ≥ $50
    //   Extras:   $4,  free ≥ $40
    // Canada orders use same session; customer sees actual cost at Stripe checkout.
    const categorySubtotals = {};
    for (const item of items) {
      const cat = item.category || 'extras';
      categorySubtotals[cat] = (categorySubtotals[cat] || 0) + item.price * item.qty;
    }
    let shippingCost = 0;
    if (categorySubtotals['pottery']  !== undefined) shippingCost += categorySubtotals['pottery']  >= 150 ? 0 : 12;
    if (categorySubtotals['supplies'] !== undefined) shippingCost += categorySubtotals['supplies'] >=  50 ? 0 :  5;
    if (categorySubtotals['extras']   !== undefined) shippingCost += categorySubtotals['extras']   >=  40 ? 0 :  4;

    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Shipping & Handling (US) — Canada orders invoiced separately for difference' },
          unit_amount: Math.round(shippingCost * 100),
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
