const exepress = require("express");
const connect = require("./schemas");
const app = exepress();
const port = 3000;

const indexRouter = require("./routers");

app.use(exepress.json());
connect();

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
