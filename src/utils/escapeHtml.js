/* eslint-disable prefer-destructuring */
/* eslint-disable array-callback-return */
import faces from "@/assets/js/face";

// eslint-disable-next-line import/prefer-default-export
export const escapeHtml = (val = "") => {
  if (!val) return "";

  // 替换表情 face[嘻嘻]
  let result = val;
  const face = /\sface\[\W{1,}]/g;
  if (face.test(result)) {
    const group = result.match(face);

    group.map(item => {
      const key = item.match(/\[\S+\]/g)[0]; // []需要进行转义，\S匹配任意不是空白的字符，即提取"[嘻嘻]"中的嘻嘻
      result = result.replace(item, `<img src="${faces[key]}">`);
    });
  }

  // 图片替换 img[链接]
  const img = /img\[\S+\]/g;
  if (img.test(result)) {
    const group = result.match(img);
    group.map(item => {
      // 4 表示 img[
      result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`);
    });
  }

  // 链接替换 a(链接)[标题]
  const link = /\sa\(\S+\]/g;
  if (link.test(result)) {
    const group = result.match(link);
    const linkName = /\((.+)\)/; // . 匹配除换行符以外的任意字符
    const title = /\[(.+)\]/;

    group.map(item => {
      const linkGroup = item.match(linkName);
      let href = "";
      if (linkGroup.length > 0) {
        href = linkGroup[1];
      }

      const titleGroup = item.match(title);
      let name = "";
      if (titleGroup.length > 0) {
        name = titleGroup[1];
      }

      result = result.replace(item, `<a href="${href}">${name}</a>`);
    });
  }

  // 引用替换
  result = result.replace(/\[quote\]/g, '<div class="layui-elem-quote">');
  result = result.replace(/\[\/quote\]/g, "</div>");
  // 代码块替换
  // hr替换

  return result;
};
