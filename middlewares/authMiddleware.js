require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;

  console.log("authorization ㄴ어ㅏ휜아훙니ㅏㅎ", authorization);

  const [authType, authToken] = (authorization ?? "").split(" ");

  if (authType !== "Bearer" || !authToken) {
    return res.status(403).json({
      errorMessage: "로그인 후에 이용할 수 있는 기능입니다.",
    });
  }

  console.log("authType ㄴ어ㅏ휜아ㄱ훙니ㅏㅎ", authToken);
  console.log("authToken ㄴ어ㅏ휜아훙ㅇ니ㅏㅎ", authToken);

  try {
    const { email } = jwt.verify(authToken, process.env.SECRET_KEY);
    const user = await Users.findOne({
      where: { email },
    });

    res.locals.user = user;

    next();
  } catch (err) {
    // 사용자 인증에 실패한 이유
    console.error(err);

    return res.status(403).json({
      errorMessage: "전달된 쿠키에서 오류가 발생하였습니다.",
    });
  }
};
