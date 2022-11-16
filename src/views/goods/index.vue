<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <span class="text-slate-400 pr-1">首页</span> /
      <span class="pl-1 font-bold">商品管理</span>
      <div class="pt-3 text-xl text-black font-bold">商品管理</div>
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
          <n-form-item label="商品名：" path="name">
            <n-input v-model:value="formValue.title" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="是否上架">
            <n-button
              type="info"
              size="small"
              class="mr-4"
              @click="sellSubmit(1)"
            >
              出售中商品
            </n-button>
            <n-button type="info" size="small" @click="sellSubmit(0)">
              下架的商品
            </n-button>
          </n-form-item>
          <n-form-item label="是否推荐">
            <n-button
              type="info"
              size="small"
              class="mr-4"
              @click="recommendSubmit(1)"
            >
              已推荐
            </n-button>
            <n-button type="info" size="small" @click="recommendSubmit(0)">
              未推荐
            </n-button>
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
          <span>商品列表</span>
          <span class="ml-auto">
            <NButton type="info" @click="showAddModal = true">+ 新建</NButton>
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
              @update:page="15"
              :page-count="totalPages"
            />
          </div>
        </div>
        <AddGood
          :showAddModal="showAddModal"
          @checkShowModal="checkAddModal"
          @reloadTable="reload"
        ></AddGood>
        <EditGood
          v-if="showEditModal"
          :good_id="good_id"
          :showEditModal="showEditModal"
          @checkShowModal="checkEditModal"
          @reloadTable="reload"
        >
        </EditGood>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from "vue";
import AddGood from "./commonents/AddGood.vue";
import EditGood from "./commonents/EditGood.vue";
import { NButton, NImage, NSwitch, useLoadingBar, useMessage } from "naive-ui";
import { goodsList, getGoodLock, recommendGood } from "@/api/goods";
const loading = ref(true);
const pagination = ref(false as const);
const formValue = ref({
  title: "",
  is_on: 0 | 1,
  is_recommend: 0 | 1,
});

const data = ref([]);
const page = ref(1);
const totalPages = ref(0);
const loadingBar = useLoadingBar();
const message = useMessage();
const columns: any = [
  {
    title: "图片",
    key: "cover_url",
    align: "center",
    render(row: any) {
      return h(NImage, { round: true, src: row.cover_url, width: "60" });
    },
  },
  {
    title: "商品名",
    key: "title",
    align: "center",
  },
  {
    title: "价格",
    key: "price",
    align: "center",
  },
  {
    title: "库存",
    key: "stock",
    align: "center",
  },
  {
    title: "销量",
    key: "sales",
    align: "center",
  },
  {
    title: "是否上架",
    key: "is_on",
    align: "center",
    render(row: any) {
      return h(NSwitch, {
        size: "medium",
        color: "#1890ff",
        activeColor: "#52c41a",
        inactiveColor: "#d9d9d9",
        activeValue: 1,
        inactiveValue: 0,
        value: row.is_on == 0 ? false : true,
        onClick: () => {
          row.is_on == 0 ? (row.is_on = 1) : (row.is_on = 0);
          // console.log(row.is_locked,"row.isload");
          handleChangeOn(row);
        },
      });
    },
  },
  {
    title: "是否推荐",
    key: "is_recommend",
    align: "center",
    render(row: any) {
      return h(NSwitch, {
        size: "medium",
        color: "#1890ff",
        activeColor: "#52c41a",
        inactiveColor: "#d9d9d9",
        activeValue: 1,
        inactiveValue: 0,
        value: row.is_recommend == 0 ? false : true,
        onClick: () => {
          row.is_recommend == 0
            ? (row.is_recommend = 1)
            : (row.is_recommend = 0);
          // console.log(row.is_locked,"row.isload");
          handleChangeRecommend(row);
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
            // console.log(row);
            good_id.value = row.id;
            showEditModal.value = true;
          },
        },
        "编辑"
      );
    },
  },
];
// 添加模态框显示状态
const showAddModal = ref(false);
const showEditModal = ref(false);
//模态框
const checkAddModal = (status: boolean) => {
  showAddModal.value = status;
};
//模态框
const checkEditModal = (status: boolean) => {
  showEditModal.value = status;
};
//页面刷新 重新请求数据
const reload = () => {
  getGoodsList({});
};
// 商品id
const good_id = ref(0);
//获取商品列表
const getGoodsList = (params: object) => {
  loadingBar.start();
  goodsList(params)
    .then((res) => {
      data.value = res.data;
      formValue.value.is_on = res.data.is_on;
      formValue.value.is_recommend = res.data.is_recommend;
      loadingBar.finish();
      loading.value = false;
    })
    .catch(() => {
      loadingBar.error();
    });
};
// 上架和下架状态更改方法
const handleChangeOn = (row) => {
  getGoodLock(row.id)
    .then(() => {
      message.success("上架状态已修改");
    })
    .catch(() => {
      getGoodsList({});
    });
};
// 推荐和不推荐状态更改方法
const handleChangeRecommend = (row) => {
  recommendGood(row.id)
    .then(() => {
      message.success("推荐状态已修改");
    })
    .catch(() => {
      getGoodsList({});
    });
};
//是否上架
const sellSubmit = (status: number) => {
  formValue.value.is_on = status;
  repetition();
};
//是否推荐
const recommendSubmit = (status: number) => {
  formValue.value.is_recommend = status;
  repetition();
};
//定义重复的方法
const repetition = () => {
  getGoodsList({
    title: formValue.value.title,
    is_on: formValue.value.is_on,
    is_recommend: formValue.value.is_recommend,
    current: 1,
  });
};
//重置
const searchReload = () => {
  getGoodsList({});
};
//搜索
const searchSubmit = (e) => {
  e.preventDefault();
  repetition();
};
onMounted(() => {
  getGoodsList({});
});
</script>

<style scoped></style>
