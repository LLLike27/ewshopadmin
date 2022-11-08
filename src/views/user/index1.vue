<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <span class="text-slate-400 pr-1">首页</span> /
      <span class="pl-1 font-bold">用户管理</span>
      <div class="pt-3 text-xl text-black font-bold">用户管理</div>
    </div>
    <div class="px-4">
      <div class="bg-white pt-4 pr-6">
        <n-form
          ref="formRef"
          inline
          :label-width="80"
          label-placement="left"
          :model="formValue"
          size="medium"
        >
          <n-form-item label="姓名" path="name">
            <n-input v-model:value="formValue.name" placeholder="请输入姓名" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
          </n-form-item>
          <n-form-item class="ml-auto">
            <n-button class="mr-4" attr-type="button" @click="searchReload">
              重置
            </n-button>
            <n-button type="info" attr-type="button" @click="searchSubmit">
              搜索
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div class="mt-4 bg-white">
        <div class="text-xl px-6 py-4 flex">
          <span>用户列表</span>
          <span class="ml-auto">
            <NButton type="info">+ 新建</NButton>
          </span>
        </div>
        <div>
          <n-data-table
            :columns="columns"
            :data="data"
            :pagination="pagination"
            :bordered="false"
            :loading="loading"
          />
          <div class="p-4 flex justify-end pr-10">
            <n-pagination
              v-model:page="page"
              @update:page="updatePage"
              :page-count="totalPages"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from "vue";
import { NButton, NAvatar, NSwitch, useMessage, useLoadingBar } from "naive-ui";
import { users, setUserLock } from "@/api/users";
const loading = ref(true);
const pagination = ref(false as const);
const formValue = ref({
  name: "",
  email: "",
});

const data = ref([]);
const page = ref(1);
const totalPages = ref(0);
const message = useMessage();
const loadingBar = useLoadingBar();
const columns: any = [
  {
    title: "头像",
    key: "avatar",
    align: "center",
    render(row: any) {
      return h(NAvatar, { round: true, src: row.avatar_url, size: "medium" });
    },
  },
  {
    title: "姓名",
    key: "name",
    align: "center",
  },
  {
    title: "邮箱",
    key: "email",
    align: "center",
  },
  {
    title: "是否禁用",
    key: "is_locked",
    align: "center",
    render(row: any) {
      return h(NSwitch, {
        size: "medium",
        color: "#1890ff",
        activeColor: "#52c41a",
        inactiveColor: "#d9d9d9",
        activeValue: 1,
        inactiveValue: 0,
        value: row.is_locked == 1 ? false : true,
        onClick: () => {
          row.is_locked == 0 ? (row.is_locked = 1) : (row.is_locked = 0);
          // console.log(row.is_locked,"row.isload");
          handleChange(row);
        },
      });
    },
  },
  {
    title: "创建时间",
    key: "created_at",
    align: "center",
  },
  {
    title: "操作",
    key: "operation",
    align: "center",
    render(row: any) {
      return h(
        NButton,
        {
          size: "small",
          color: "#1890ff",
          strong: true,
          onClick: () => {
            console.log(row);
          },
        },
        "编辑"
      );
    },
  },
];
//重置
const searchReload = () => {
  getUsersListData({});
  formValue.value = {
    // 重置后，进行搜索框清空
    name: "",
    email: "",
  };
};
//搜索
const searchSubmit = (e) => {
  e.preventDefault();
  getUsersListData({
    current: 1,
    name: formValue.value.name,
    email: formValue.value.email,
  });
};
//获取 更新 用户列表数据
const getUsersListData = (params: any) => {
  loadingBar.start();
  users(params)
    .then((users: any) => {
      // console.log(users);
      data.value = users.data;
      page.value = users.meta.pagination.current_page;
      totalPages.value = users.meta.pagination.total_pages;
      loadingBar.finish();
      loading.value = false;
    })
    .catch(() => {
      loadingBar.error();
    });
};
//更新page数据
const updatePage = (pageIndex) => {
  getUsersListData({
    current: pageIndex,
    name: formValue.value.name,
    email: formValue.value.email,
  });
};
//更新是否禁用
const handleChange = (row: any) => {
  setUserLock(row.id).then((res) => {
    console.log(res);
    message.info("禁用状态已修改");
  });
};
onMounted(() => {
  getUsersListData({});
});
</script>

<style scoped></style>
