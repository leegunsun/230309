const {
  Prefer,
  CardPost,
  Comment,
  PostLike,
  CommentLike,
} = require("../models");
const { Op } = require("sequelize");

// selectprefer: 0 디폴트
// 7. 포스트 찬성 8. 포스트 반대.

class PreferRepository {
  /**
   * 포스트에 대해서 찬성표를 던집니다.
   */
  postProInput = async (userIdx, postIdx) => {
    await Prefer.create({
      userIdx: userIdx,
      postIdx: postIdx,
      selectprefer: "7", // 포스트 찬성
    });

    return;
  };

  // 포스트에 대해서 반대표를 던집니다.
  postConInput = async (userIdx, postIdx) => {
    await Prefer.create({
      userIdx: userIdx,
      postIdx: postIdx,
      selectprefer: "8", // 포스트 반대
    });

    return;
  };

  /**
   * 포스트에 대해서 찬성표를 취소합니다.
   */
  postProDelete = async (userIdx, postIdx) => {
    return await Prefer.destroy({
      where: { userIdx: userIdx, postIdx: postIdx },
    });
  };

  // 포스트에 대해서 반대표를 취소합니다.
  postConDelete = async (userIdx, postIdx) => {
    return await Prefer.destroy({
      where: { userIdx: userIdx, postIdx: postIdx },
    });
  };

  // 포스트의 찬성표를 집계합니다.
  postProCount = async (postIdx) => {
    return await Prefer.count({
      where: { postIdx: postIdx, selectprefer: "7" }, // 포스트 찬성
    });
  };

  // 포스트의 반대표를 집계합니다.
  postConCount = async (postIdx) => {
    return await Prefer.count({
      where: { postIdx: postIdx, selectprefer: "8" }, // 포스트 반대
    });
  };

  // 포스트에 찬성 혹은 반대 했는지 알아봅니다.
  findPollUserCheck = async (userIdx, postIdx, selectprefer) => {
    return await Prefer.findOne({
      where: { postIdx, userIdx, selectprefer }, // 포스트 찬성 '7' , 반대 '8'
    });
  };
}

module.exports = PreferRepository;
