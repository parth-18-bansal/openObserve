import express from "express";
import pino from "pino";

const app = express();
const port = 3005;

const logger = pino({
  level: "info",
  transport: {
    target: "@openobserve/pino-openobserve",
    options: {
      url: "http://localhost:5080/",
      organization: "default",
      streamName: "default",
      auth: {
        username: "root@example.com",
        password: "Complexpass#123",
      },
      batchSize: 1,
      timeThreshold: 15*1000
    },
  },
});

app.use(express.json());

app.get("/hello", (req, res) => {
  logger.info({
    log: "Hello World!",
    type: "GET",
    url: "/hello",
  });

  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});