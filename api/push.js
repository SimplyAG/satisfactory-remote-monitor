// OneSignal Push Notification API
// REST API Key should be set as environment variable ONESIGNAL_API_KEY in Vercel

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: 'Missing title or message' });
  }

  const apiKey = process.env.ONESIGNAL_API_KEY;
  const appId = 'dc513fb0-d412-4240-913e-649e66c19eae';

  if (!apiKey) {
    return res.status(500).json({ error: 'Push notifications not configured' });
  }

  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${apiKey}`
      },
      body: JSON.stringify({
        app_id: appId,
        included_segments: ['All'],
        headings: { en: title },
        contents: { en: message },
        url: 'https://satisfactory-remote-monitor.vercel.app'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OneSignal error:', data);
      return res.status(response.status).json({ error: 'Failed to send push', details: data });
    }

    res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Push error:', error);
    res.status(500).json({ error: 'Failed to send push', message: error.message });
  }
}
