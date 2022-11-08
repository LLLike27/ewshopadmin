import { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import { renderIcon } from "@/utils";
import { Body } from "@vicons/ionicons5";
const routeName = "user";
/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: routeName,
    component: Layout,
    redirect: "/user/list",

    meta: {
      title: "用户管理",
      icon: renderIcon(Body),
      sort: 2,
    },
    children: [
      {
        path: "list1",
        name: `${routeName}_list1`,
        meta: {
          title: "用户列表1",
          // icon: renderIcon(Body),
        },
        component: () => import("@/views/user/index1.vue"),
      },
      {
        path: "list2",
        name: `${routeName}_list2`,
        meta: {
          title: "用户列表2",
          // icon: renderIcon(Body),
        },
        component: () => import("@/views/user/list2/index2.vue"),
      },
    ],
  },
];
export default routes;
