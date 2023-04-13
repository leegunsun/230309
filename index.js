const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", (req, res) => {
  return res.json({ "암아허;ㅣ나엏;ㅣ": "일반 / 입니다" });
});

app.use("/api", (req, res) => {
  return res.json({ "암아허;ㅣ나엏;ㅣ": "ㅁ나허;ㅁ니ㅏ허;ㄴ미" });
});

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
