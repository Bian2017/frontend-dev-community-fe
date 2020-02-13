import moment from "moment";
import "moment/locale/zh-cn";

const formatDate = date => {
  // 超过7天，显示日期
  if (moment(date).isBefore(moment().subtract(7, "days"))) {
    return moment(date).format("YYYY-MM-DD");
  }

  // 否则显示1小时前，xx小时前，X天前
  return moment(date).from(moment());
};

export default { formatDate };
