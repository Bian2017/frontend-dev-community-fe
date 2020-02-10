import { ValidationProvider, ValidationObserver } from "vee-validate";
import uuid from "uuid/v4";
import { getCaptchaAsync } from "@/services/login";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  // 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”
  data() {
    return {
      code: "", // 验证码
      svgCaptcha: ""
    };
  },
  mounted() {
    let sid = "";
    if (localStorage.getItem("sid")) {
      sid = localStorage.getItem("sid");
    } else {
      // uuid: 通用唯一识别码，具有唯一性
      sid = uuid();
      localStorage.setItem("sid", sid);
    }

    this.$store.commit("setSid", sid);
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      const { sid } = this.$store.state;

      getCaptchaAsync(sid).then(res => {
        this.svgCaptcha = res.data;
      });
    }
  }
};
