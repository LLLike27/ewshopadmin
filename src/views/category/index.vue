<template>
  <div>
    <div class="h-24 w-full bg-white p-3 mb-6">
      <span class="text-slate-400 pr-1">首页</span> /
      <span class="pl-1 font-bold">分类管理</span>
      <div class="pt-3 text-xl text-black font-bold">分类管理</div>
    </div>
    <div class="content px-4">
      <span class="ml-auto"
        ><NButton type="info" @click="showAddModal = true">添加分类</NButton></span
      >
      <div class="mt-4 bg-white">
        <div>
          <n-data-table
            :columns="columns"
            :data="data"
            :loading="loading"
            default-expand-all
            allow-checking-not-loaded
          />
        </div>
      </div>
      <AddCategory
        :showAddModal="showAddModal"
        @checkShowModal="checkShowAddModal"
        @reloadTable="reload"
      ></AddCategory>
      <EditCategory
        v-if="showEditModal"
        :category_id="category_id"
        :showEditModal="showEditModal"
        @checkShowModal="checkShowEditModal"
        @reloadTable="reload"
      ></EditCategory>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref, onMounted } from "vue";
import { categoryList, setCategoryLock } from "@/api/category";
import { NButton, NSwitch, useLoadingBar, useMessage } from "naive-ui";
import AddCategory from "@/views/category/components/AddCategory.vue";
import EditCategory from "@/views/category/components/EditCategory.vue";
//显示模态框
const showAddModal = ref(false);
const showEditModal = ref(false);
const category_id = ref(0);
const message = useMessage();
const checkShowAddModal = (status: boolean) => {
  showAddModal.value = status;
};
const checkShowEditModal = (status: boolean) => {
  showEditModal.value = status;
};

const data: any = ref([]);
// 页面加载条
const loadingBar = useLoadingBar();
// 数据加载loading
const loading = ref(true);
//表头数据
const columns: any = [
  {
    title: "分类ID",
    key: "id",
    align: "left",
  },
  {
    title: "分类名称",
    key: "name",
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
        value: row.status == 1 ? false : true,
        onClick: () => {
          row.status == 0 ? (row.status = 1) : (row.status = 0);
          console.log(row);

          handleChange(row);
        },
      });
    },
  },
  {
    title: "分类排序",
    key: "seq",
    width: "15%",
    align: "center",
    sorter: (row1, row2) => row1.seq - row2.seq,
  },
  {
    title: "操作",
    key: "created_at",
    align: "center",
    render(row) {
      return h(
        NButton,
        {
          size: "small",
          color: "#1890ff",
          strong: true,
          onClick: () => {
            console.log(row);
            category_id.value = row.id;
            showEditModal.value = true;
          },
        },
        "修改"
      );
    },
  },
];
//刷新页面
const reload = () => {
  getCategoryList({ type: "all" });
};
//更新是否禁用
const handleChange = (row: any) => {
  setCategoryLock(row.id)
    .then((res) => {
      console.log(res);
      message.info("禁用状态已修改");
    })
    .catch(() => {
      message.error("无权限");
    });
};
//获取分类列表
const getCategoryList = (params: object) => {
  loadingBar.start();
  categoryList(params)
    .then((res: any) => {
      console.log("=========", res);
      data.value = res;
      loadingBar.finish();
      loading.value = false;
    })
    .catch(() => {
      loadingBar.error();
    });
};
onMounted(() => {
  getCategoryList({ type: "all" });
});
</script>

<style scoped></style>
