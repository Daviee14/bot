const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

server.all('/', (req, res) => {
  res.send('Bot is running!');
});

function keepAlive() {
  server.listen(PORT, () => {
    console.log(`Server is ready on port ${PORT}.`);
  });

  // Ping self every 14 minutes (Replit timeout is ~15-20 mins)
  if(process.env.REPLIT_URL) {
    setInterval(() => {
      require('node-fetch')(process.env.REPLIT_URL)
        .catch(err => console.log('Ping failed:', err));
    }, 840000); // 14 minutes
  }
}

module.exports = keepAlive;