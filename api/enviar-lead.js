export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, nome, event_id } = req.body;
    const url = `https://graph.facebook.com/v17.0/${process.env.FB_PIXEL_ID}/events?access_token=${process.env.FB_ACCESS_TOKEN}`;

    const fbData = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id,
        user_data: {
          em: [email],
          fn: [nome]
        },
        action_source: 'website'
      }]
    };

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fbData),
      });
      return res.status(200).json({ status: 'Sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro no Servidor' });
    }
  }
  res.status(405).send('Método não permitido');
}