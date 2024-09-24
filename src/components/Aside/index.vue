<template>
    <div v-if="ListRouter.length">
        <el-menu :default-active="defaultAcitve.toString()" class="el-menu-vertical-demo"
            background-color="rgb(154, 213, 154)" text-color="black" @open="handleOpen" @close="handleClose">
            <el-menu-item :index="index.toString()" v-for="(item, index) in ListRouter" :key="index"
                @click="ClickRouter(item, index)">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const router = useRouter()
const ListRouter = ref(router.options.routes)
onMounted(() => {
    // console.log(ListRouter);
})
// console.log(router.options.routes);
const defaultAcitve = ref(JSON.parse(localStorage.getItem('default-active'))?.index || 0)
function ClickRouter(item, index) {
    localStorage.setItem('default-active', JSON.stringify({ index: index, path: item.path }))
    router.push(`${item.path}`)
    // window.open(item.path, '_blank');
}
const handleOpen = (key, keyPath) => {
    // console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    // console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.el-menu {
    margin: 0;
    background-color: transparent;
    // color: rgb(154, 213, 154);
}

// .el-menu-item {
//     background-color: rgb(214, 214, 214);
// }
::v-deep .el-menu-item {
    height: 60px;
}

::v-deep .el-menu-item is-active {
    background-color: rgb(126, 141, 240);
}
</style>
