"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const quotes = tickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit("tickers", quotes);
}

const getQuote = (name) => {
  const ticker = tickers.find(
    (ticker) => ticker.toLowerCase() === name.toLowerCase()
  );
  if (ticker === undefined) return null;

  return {
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  };
};

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setInterval(function () {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

const trackTicker = (name, socket) => {
  const timer = setInterval(() => {
    const ticker = getQuote(name);
    socket.emit(`ticker/${name}/fulfilled`, { data: ticker, params: { name } });
  }, FETCH_INTERVAL);

  socket.on("disconnect", () => {
    clearInterval(timer);
  });
  socket.on("ticker:stop", ({ name: nameToStop }) => {
    if (nameToStop === name) {
      clearInterval(timer);
    }
  });
};

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/ui/home/tickers", (_, res) => {
  return res.send(tickers);
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket);
  });

  socket.on("ticker:start", ({ name }) => {
    const ticker = getQuote(name);
    if (ticker === null) {
      socket.emit(`ticker/${name}/rejected`, {
        error: { code: 404, message: "Ticker Not Found", params: { name } },
      });
    } else {
      socket.emit(`ticker/${name}/fulfilled`, {
        data: ticker,
        params: { name },
      });
      trackTicker(name, socket);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
