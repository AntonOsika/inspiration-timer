const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/quote', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching quote');
  }
});

app.listen(port, () => {
  console.log(`Pomodoro app listening at http://localhost:${port}`);
});
