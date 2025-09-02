// server.js
const express = require('express');
const fetch = require('node-fetch'); // ✅ Keep this for Node < 18
const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ✅ Proxy endpoint
app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing "url" parameter' });
  }

  try {
    const response = await fetch(url);
    const data = await response.text(); // ✅ Read as text to preserve JSON/HTML
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy failed:', error); // ✅ Log error
    res.status(500).json({ error: 'Proxy failed', message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
