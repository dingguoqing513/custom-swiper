import request from "../utils/axios";

/**
 * @desc 获取轮播图内容
 */
export const fetchAllJson = () => {
  return request({
    url: "all.json",
    method: "get",
  });
};
