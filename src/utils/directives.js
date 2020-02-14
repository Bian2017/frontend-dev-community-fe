// 自定义指令
import { escapeHtml } from "@/utils/escapeHtml";

export default {
  //  自定义指令richtext: 对富文本进行转义
  richtext: {
    bind(el, binding) {
      el.innerHTML = escapeHtml(binding.value);
    }
  }
};
