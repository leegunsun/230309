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

app.use((req, res, next) => {
  return res.json({ 제발: "성공ㅎ재gsdgsd" });
});

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});