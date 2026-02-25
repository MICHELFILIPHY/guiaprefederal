export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const pixelId = '1277565054245508'; // seu Pixel
  const accessToken = 'EAAJdWpadBYwBQyQ532ljy0eV6pkHd6DGn7famAmj9q1XZBZBtLPXtYZBjY9TxJsgeeZBOhX8Lg2ZA6CKAjfAsg3ZANQx0G4EUPgBvqttsBdBAYSB8CWT8OyoZC86X0JyYHnW3hF8YcubWPkJ6kp3UrnJGtzvhlQA8MswVGC1xYRToZCXAXjXfjT6wmYCGj6o4QZDZD';

  const eventData = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website'
      }
    ]
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      }
    );

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
