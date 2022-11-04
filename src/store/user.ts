import { defineStore } from "pinia";

// 定义state中的数据类型
export interface IUserState {
  token: string;
  username: string;
  avatar_url: string;
  permissions: string[];
  info: any;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): IUserState => ({
    token: localStorage.getItem("token") || "", // 在页面刷新时已经保留token
    username: "",
    avatar_url: "",
    permissions: [],
    info: {},
  }),
  getters: {},
  actions: {},
});
