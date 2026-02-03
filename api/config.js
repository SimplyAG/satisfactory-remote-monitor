import { kv } from '@vercel/kv';

// Hash PIN to use as key (same algorithm as frontend)
function hashPin(pin) {
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'frm_' + Math.abs(hash).toString(16);
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST - Save config
  if (req.method === 'POST') {
    try {
      const { pin, host, port, token } = req.body;

      if (!pin || !host) {
        return res.status(400).json({ error: 'PIN and host are required' });
      }

      const key = hashPin(pin);
      const config = {
        host,
        port: port || '8080',
        token: token || '',
        createdAt: Date.now()
      };

      await kv.set(key, config);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving config:', error);
      return res.status(500).json({ error: 'Failed to save config' });
    }
  }

  // GET - Retrieve config
  if (req.method === 'GET') {
    try {
      const { pin } = req.query;

      if (!pin) {
        return res.status(400).json({ error: 'PIN is required' });
      }

      const key = hashPin(pin);
      const config = await kv.get(key);

      if (!config) {
        return res.status(404).json({ error: 'Invalid PIN - no server found' });
      }

      return res.status(200).json(config);
    } catch (error) {
      console.error('Error getting config:', error);
      return res.status(500).json({ error: 'Failed to get config' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
