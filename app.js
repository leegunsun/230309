require("dotenv").config();
const express = require("express");
const app = express();
// index.js
const Slack = require("slack-node");
// 생성한 token
const API_TOKEN = "xoxb-5137346135345-5124606195571-L16VfLDZpPnbNTyTZC9de62t";
const slack = new Slack(API_TOKEN);
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./middlewares/logger.js");
const cookieParser = require("cookie-parser");
app.use(morgan("dev"));

const indexRouter = require("./routes/index");

const PORT = process.env.SERVER_PORT;
//
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

const send = async (sender, message) => {
  slack.api(
    "chat.postMessage",
    {
      text: `${sender}:\n${message}`,
      channel: "#에러핸들링",
      icon_emoji: "slack",
    },
    (error, response) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(response);
    }
  );
};

send("user1", "send message");

app.use("/api", indexRouter);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  slack.api("chat.postMessage", {
    text: "에러 : \n${err.stack}",
    channel: "#에러핸들링",
    icon_emoji: "slack",
  });
  return res.status(err.output.payload.statusCode || 500).json({
    errorMessage: err.output.payload.message || "서버 에러가 발생했습니다.",
  });
});

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
  logger.info(`${PORT} 포트 번호로 서버가 실행되었습니다.`);
});
