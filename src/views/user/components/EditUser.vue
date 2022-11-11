<template>
  <n-modal
    v-model:show="props.showEditModal"
    @update:show="$emit('checkShowEditModal', false)"
    :mask-closable="true"
  >
    <n-card
      style="width: 600px"
      title="编辑用户"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error" @click="$emit('checkShowEditModal', false)">X</n-button>
      </template>
      <n-form v-if="showForm" ref="formRef" :model="model" :rules="rules">
        <n-form-item path="name">
          <div class="title">姓名：</div>
          <n-input v-model:value="model.name" placeholder="请输入姓名" />
        </n-form-item>
        <n-form-item path="email">
          <div class="title">邮箱：</div>
          <n-input v-model:value="model.email" placeholder="请输入邮箱" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: space-evenly">
              <n-button round type="primary" @click="updateSubmit"> 提交 </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
      <n-skeleton v-else text :repeat="2" />
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUserInfo, updateUserInfo } from "@/api/users";
import { useMessage } from "naive-ui";
const showForm = ref(false);
const message = useMessage();
const props = defineProps({
  showEditModal: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Number,
    default: null,
  },
});
//定义两个自定义emit事件
const emit = defineEmits(["checkShowEditModal", "reloadTable"]);

const model = ref({
  name: "",
  email: "",
});
const rules = {
  name: [
    {
      required: true,
      message: "请输入姓名",
    },
  ],
  email: [
    {
      required: true,
      message: "请输入邮箱",
    },
  ],
};

const formRef = ref();
//添加用户
const updateSubmit = (e: any) => {
  e.preventDefault();
  //匹配表单规则 验证正常才发送请求添加用户
  formRef.value?.validate((errors: any) => {
    if (errors) {
      console.log(errors);
    } else {
      updateUserInfo(props.userId, model.value).then((_res) => {
        message.success("修改成功");
        emit("checkShowEditModal", false);
        emit("reloadTable");
      });
    }
  });
};

onMounted(() => {
  if (props.userId) {
    getUserInfo(props.userId).then((res) => {
      model.value.name = res.name;
      model.value.email = res.email;
      showForm.value = true;
    });
  }
});
</script>

<style>
.title {
  font-size: 16px;
  height: 32px;
  line-height: 30px;
  text-align: center;
  width: 30%;
  margin-right: 5px;
  border: 1px solid #ccc;
  background-color: #deecf4;
}
</style>
