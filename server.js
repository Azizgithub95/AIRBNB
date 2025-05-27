const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send('Bienvenue sur Hermès Test via Kubernetes !');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
