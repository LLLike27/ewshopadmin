<template>
    <div class="view-account">
        <div class="view-account-header"></div>
        <div class="view-account-container">
            <div class="view-account-top">
                <div class="view-account-top-logo m-0">
                    <img class="m-auto" style="margin: auto" src="@/assets/images/logo.png" alt="" />
                </div>
            </div>
            <div class="view-account-form">
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>


</script>
  
<style lang="less" scoped>
.view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
        flex: 1;
        padding: 32px 12px;
        max-width: 384px;
        min-width: 320px;
        margin: 0 auto;
    }

    &-top {
        padding: 32px 0;
        text-align: center;

        &-desc {
            font-size: 14px;
            color: #808695;
        }
    }

    &-other {
        width: 100%;
    }

    .default-color {
        color: #515a6e;

        .ant-checkbox-wrapper {
            color: #515a6e;
        }
    }
}

@media (min-width: 768px) {
    .view-account {
        background-image: url('../../assets/images/login.svg');
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
    }

    .page-account-container {
        padding: 32px 0 24px 0;
    }
}
</style>
  