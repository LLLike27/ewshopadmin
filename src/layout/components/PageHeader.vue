<template>
    <div class="w-full h-14 flex items-center  overflow-hidden justify-end px-8 shadow shadow-md shadow-sky-500"
        style="border-bottom: 1px solid #ccc">
        <!-- 头像 -->
        <n-dropdown :options="options" @select="select">
            <n-spin :show="show" size="small">
                <div class="flex items-center">
                    <n-avatar round size="small" :src="userStore.getAvatar" />
                    <span class="pl-2">{{ userStore.getUserName }}</span>
                    <!--                        超级管理员-->
                </div>
            </n-spin>
        </n-dropdown>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { renderIcon } from "@/utils";
import { useUserStore } from '@/store/user'
import { logout } from "@/api/auth";
import { LogOutOutline as LogoutIcon } from "@vicons/ionicons5";
// 定义加载
const show = ref(true);

const userStore = useUserStore();
userStore.getUserInfo;//刷新页面就重新调用用户数据

// 页面加载事件
onMounted(() => {
    // console.log(userStore.getAvatar);

    if (useUserStore()) {
        show.value = false
    }
})

const options: any = ref([
    {
        label: "退出登录",
        key: "logout",
        icon: renderIcon(LogoutIcon)
    }
]);
//匹配对应的key 做不同的事
const select = (key: string) => {
    switch (key) {
        case "logout":
            logout().then(() => {
                localStorage.removeItem("token");
                window.location.reload();
            });
            break;
        default:
            break;
    }
};
</script>

<style scoped>

</style>