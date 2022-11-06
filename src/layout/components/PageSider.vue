<template>
    <div class="pt-4">
        <div class="m-0">
            <img style="margin:auto" src="@/assets/images/logo.png" alt="logo">
        </div>
        <div>
            <n-menu :options="menuOptions" :value="defaultKey" inverted @update:value="handleUpdateValue" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, } from "vue";
import { routeModuleList } from "@/router";
import { generatorMenu } from "@/utils"
import { useRoute, useRouter } from "vue-router";


const defaultKey = ref("");
onMounted(() => {
    const route = useRoute();
    // 获取当前路由的key
    const routeKey = route.name;
    //页面刷新匹配当前的路由
    if (typeof routeKey === "string") {
        console.log(routeKey);

        defaultKey.value = routeKey;
    }
})

//侧边栏标题 用封装好的路由数据 然后传到Menu菜单里面去 
const menuOptions = generatorMenu(routeModuleList)

//点击跳转
const router = useRouter()
const handleUpdateValue = (key: any) => {
    // console.log(key);

    defaultKey.value = key
    router.push({ name: key })
}
</script>

<style scoped>

</style>