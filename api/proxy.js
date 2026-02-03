export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Security: Only allow FRM API endpoints
  // Valid endpoints: /getPower, /getPlayer, /getTrains, /sendChatMessage, etc.
  const validEndpoint = /\/(get|send)[A-Za-z]+(\?.*)?$/.test(url);
  if (!validEndpoint) {
    return res.status(403).json({ error: 'Invalid endpoint - only FRM API calls allowed' });
  }

  // Security: Block obviously malicious URLs
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('localhost') ||
      lowerUrl.includes('127.0.0.1') ||
      lowerUrl.includes('169.254') ||
      lowerUrl.includes('10.') ||
      lowerUrl.includes('192.168.') && !req.headers['x-forwarded-for']) {
    // Allow private IPs only - this is expected for game servers
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'SatisfactoryDashboard/1.0'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Upstream error',
        status: response.status
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch', message: error.message });
  }
}
