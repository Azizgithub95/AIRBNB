const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur Hermès Test via Kubernetes V3 !');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
