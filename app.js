require("dotenv").config();
const express = require("express");
const app = express();

const { App } = require("@slack/bolt");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const logger = require("./middlewares/logger.js");

app.use(morgan("dev"));

const indexRouter = require("./routes/index");

const slack = new App({
  token: "xoxb-5137346135345-5124606195571-ZMIUvWfqLhWLa1ykQgAyT37B",
  signingSecret: "40e15569d862bd4b9b54a4bea2a807fb",
  socketMode: true,
  appToken:
    "xapp-1-A053KP1NNG5-5122736143893-689e06402a59d7e71cbae172f717c693f88368070bfe0fcc4e13498c62a8386b",
});

const PORT = process.env.SERVER_PORT;

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["Authorization"],
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", (req, res, next) => {
  res.send("바뀜123");
});

app.use("/api", indexRouter);

app.use((err, req, res, next) => {
  // Slack에 에러 메시지를 보냅니다.
  slack.client.chat.postMessage({
    channel: "C053R5WK4G4",
    text: `An error occurred : ${err.message}`,
  });

  return res.status(err.output.payload.statusCode || 500).json({
    errorMessage: err.output.payload.message || "서버 에러가 발생했습니다.",
  });
});

(async () => {
  await slack.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
  logger.info(`${PORT} 포트 번호로 서버가 실행되었습니다.`);
});
