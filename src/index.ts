import express from "express";
import pino from "pino";

const app = express();
const port = 3005;

const logger = pino({
  level: "info",
  transport: {
    target: "@openobserve/pino-openobserve",
    options: {
      url: "https://your-openobserve-server.com",
      organization: "your-organization",
      streamName: "your-stream",
      auth: {
        username: "your-username",
        password: "your-password",
      },
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