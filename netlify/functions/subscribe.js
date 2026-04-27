exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { email, firstName } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const dc = apiKey.split('-')[1]; // e.g. "us1" from the end of the API key

    const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    // Already subscribed is not an error from the user's perspective
    if (data.title === 'Member Exists') {
      return { statusCode: 200, body: JSON.stringify({ success: true, alreadySubscribed: true }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: data.detail || 'Could not subscribe' }) };

  } catch (error) {
    console.error('Mailchimp error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
