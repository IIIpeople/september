<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import Aside from "@/components/Aside/index.vue";
import Header from "@/components/Header/index.vue";
import { ref, onMounted } from "vue";
const route = useRoute()
const router = useRouter()
const defaultAcitve = ref(JSON.parse(localStorage.getItem('default-active')) || 2)
onMounted(() => {
  if (defaultAcitve == null) {
    console.log(route.fullPath);
  } else {
    // console.log(defaultAcitve.value);
    router.push(defaultAcitve.value.path)
  }
})
// 监听窗口大小变化事件
// window.addEventListener('resize', function () {
//   // 获取当前窗口的宽度
//   var windowWidth = window.innerWidth;
//   // 在控制台输出当前窗口宽度（可选）
//   // console.log('当前窗口宽度：', windowWidth);
//   // 在这里执行你想要随窗口宽度变化而执行的操作
//   // 例如，可以根据窗口宽度调整页面布局或者触发其他逻辑
// });
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="fit-content">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- https://www.douyin.com/?recommend=1 -->
</template>

<style scoped lang="scss"></style>
