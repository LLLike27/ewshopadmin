<template>
  <div>
    <n-message-provider>
      <!-- message信息框 -->
      <n-loading-bar-provider>
        <!-- loading加载条 -->
        <router-view></router-view>
      </n-loading-bar-provider>
    </n-message-provider>
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped>

</style>
