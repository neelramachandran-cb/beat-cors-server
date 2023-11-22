const express = require("express");
const request = require("request");
const { createProxyMiddleware } = require("http-proxy-middleware");
var cors = require('cors')

const app = express();

app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://pay.coinbase.com",
    changeOrigin: true,
  })
);

app.get("/jokes/random", (req, res) => {
  request(
    { url: "https://joke-api-strict-cors.appspot.com/jokes/random" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
