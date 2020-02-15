// 自定义指令
import { escapeHtml } from "@/utils/escapeHtml";

export default {
  //  自定义指令richtext: 对富文本进行转义
  richtext: {
    bind(el, binding) {
      // 注意： bind只调用一次，当评论数据发生变化，便不会再执行，此时还需调用componentUpdated
      el.innerHTML = escapeHtml(binding.value);
    },
    componentUpdated(el, binding) {
      el.innerHTML = escapeHtml(binding.value);
    }
  }
};
