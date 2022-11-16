<template>
  <n-upload :custom-request="customRequest" :multiple="true" :max="1">
    <n-button v-if="!imgUrl">上传文件</n-button>
    <n-image v-else width="100" :src="imgUrl" :preview-disabled="true" />
  </n-upload>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { uploadToken } from "@/api/base";
import axios from "axios";
const emit = defineEmits(["backKey"]);
const imgUrl: any = ref(null);
const customRequest: any = ({ file, action, header, onFinish, onError }) => {
  uploadToken().then((res) => {
    // 图片上传的逻辑
    // 组装上传的参数、FormData浏览器自带的，存储form数据
    console.log("==================", file, action, header, onFinish, onError);
    const formData = new FormData();
    // 随机生成图片名称 带有时间戳 根据 file.name 来获取文件后缀名
    const fileName = `${Date.now()}${Math.floor(
      Math.random() * 1000
    )}.${file.name.split(".").pop()}`;
    formData.append("key", fileName);
    formData.append("OSSAccessKeyId", res.accessid);
    formData.append("policy", res.policy);
    formData.append("Signature", res.signature);
    formData.append("file", file.file);
    // 发送请求
    // console.log(formData);
    axios
      .post(res.host, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        emit("backKey", fileName);
        imgUrl.value = `${res.host}/${fileName}`;
        onFinish(fileName);
      })
      .catch(() => {});
  });
};
</script>

<style scoped></style>
