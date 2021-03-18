<template>
  <div class="login-box">
    <div class="login-logo">
      <svg-icon icon-class="logo" />
      <h1>Vue3 Antd Admin</h1>
    </div>
    <a-form
      layout="horizontal"
      :model="formInline"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item>
        <a-input
          v-model:value="formInline.user"
          placeholder="admin"
          autocomplete="new-password"
        >
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.password"
          type="password"
          placeholder="123456"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item :rules="{ required: true, message: '请填写验证码' }">
        <div class="vertify-container">
          <a-input v-model:value="verify" placeholder="输入验证码" />
          <vue-img-verify ref="verifyRef" />
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="loading"
          block
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { SvgIcon } from "@/components/svg-icon";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { message } from "ant-design-vue";
import { defineComponent, reactive, toRefs, ref } from "vue";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { UserActionTypes } from "@/store/modules/user/actions";
import vueImgVerify from "@/components/VueImageVerify/index.vue";

interface FormState {
  loading: boolean;
  verify: string;
  imgCode: string;
  formInline: {
    user: string;
    password: string;
  };
}
export default defineComponent({
  name: "login",
  setup() {
    const verifyRef = ref<any>(null);
    const formState: FormState = reactive({
      loading: false,
      verify: "",
      imgCode: "",
      formInline: {
        user: "",
        password: "",
      },
    });
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    // 处理提交
    const handleFinish = async () => {
      const { user: username, password } = formState.formInline;
      if (username.trim() === "" || password.trim() === "")
        return message.warning("用户名或者密码不能为空");
      // 获取验证码
      formState.imgCode = verifyRef.value.imgCode || "";
      console.log(formState.verify);

      if (formState.verify.toLowerCase() != formState.imgCode.toLowerCase()) {
        message.warning("验证码错误");
        return;
      }
      // 启动加载
      formState.loading = true;
      const params = {
        username,
        password,
      };

      // 发送请求
      const res = await store
        .dispatch(UserActionTypes.Login, params)
        .finally(() => {
          formState.loading = false;
          message.destroy();
        });
      const { code, message: msg } = res;
      if (code === 0) {
        const toPath = decodeURIComponent(
          (route.query?.redirect || "/") as string
        );
        message.success("登录成功!");
        router.replace(toPath).then(() => {
          if (route.name === "login") {
            router.replace("/");
          }
        });
      } else {
        message.info(msg || "登录失败!");
      }
    };
    // 处理提交失败
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    return {
      ...toRefs(formState),
      handleFinish,
      handleFinishFailed,
      verifyRef,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
    SvgIcon,
    vueImgVerify,
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  padding-top: 240px;
  flex-direction: column;
  align-items: center;
  background: url("~@/assets/login.svg");
  background-size: 100%;

  .login-logo {
    display: flex;
    align-items: top;
    margin-bottom: 30px;

    .svg-icon {
      font-size: 48px;
    }

    img {
      height: 48px;
    }
    h1 {
      margin-left: 10px;
      margin-bottom: 0;
    }
  }

  ::v-deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }

    .ant-input-affix-wrapper {
      padding: 8px 11px;
    }

    .ant-input-prefix {
      .anticon {
        color: #000 !important;
        font-size: 16px;
      }
    }

    .ant-form-item-label {
      padding-right: 6px;
    }
  }

  .vertify-container {
    display: flex;
    height: 40px;
    line-height: 1;
    flex-direction: row;
    align-items: center;
    input {
      margin-right: 100px;
      padding: 7px 11px;
    }
  }
}
</style>