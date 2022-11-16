<template>
  <n-modal
    v-model:show="props.showAddModal"
    @update:show="$emit('checkShowModal', false)"
    :mask-closable="true"
  >
    <n-card
      style="width: 600px"
      title="添加分类"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-button type="error" @click="$emit('checkShowModal', false)">X</n-button>
      </template>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="name">
          <div class="title">分类名称：</div>
          <n-input v-model:value="model.name" placeholder="请输入名称" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: space-evenly">
              <n-button round type="primary" @click="userSubmit"> 添加 </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { addCategory } from "@/api/category";
const props = defineProps({
  showAddModal: { type: Boolean, default: false },
});
//定义两个自定义emit事件
const emit = defineEmits(["checkShowModal", "reloadTable"]);

const model: any = ref({
  name: null,
});
const rules = {
  name: [
    {
      required: true,
      message: "请输入名称",
    },
  ],
};

const formRef = ref();
//添加用户
const userSubmit = (e: any) => {
  e.preventDefault();
  //匹配表单规则 验证正常才发送请求添加用户
  formRef.value?.validate((errors: any) => {
    if (errors) {
      console.log(errors);
    } else {
      addCategory(model.value).then((_res) => {
        emit("checkShowModal", false);
        emit("reloadTable"); //子组件触发事件  父组件 页面刷新
      });
    }
  });
};
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
