<template>
    <div class="header">
        <div class="avatar">
            <el-avatar src="https://q6.itc.cn/q_70/images03/20240601/80b789341c9b45cb8a76238650d288a5.png"
                @click="ShowBigImage" />
        </div>
        <div class="name">
            <el-tooltip class="box-item" effect="dark" content="admin" placement="bottom">
                admin
            </el-tooltip>
        </div>
        <div class="details">
            <button @click="ShowDeFun">
                <el-icon>
                    <ArrowDownBold />
                </el-icon>
            </button>
            <div class="box" v-if="showDetail">
                <el-icon style="position: absolute;color: white;right: -3px;top:-14px" :size="20">
                    <CaretTop />
                </el-icon>
                <div>
                    <button style="width: 100%;border: 0;">退出</button>
                </div>
            </div>
        </div>
    </div>
    <div class="dialogbox" v-if="dialogImage">
        <p>上传头像</p>
        <div>
            <el-avatar shape="square" fit="cover" :size="120"
                src="https://q6.itc.cn/q_70/images03/20240601/80b789341c9b45cb8a76238650d288a5.png" />
        </div>
        <div>
            <el-button type="primary" plain @click="dialogImage = false">上传</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const showDetail = ref(false)
function ShowDeFun() {
    showDetail.value = !showDetail.value
}
const dialogImage = ref(false)
function ShowBigImage() {
    dialogImage.value = true
}
</script>

<style lang="scss" scoped>
.dialogbox {
    position: fixed;
    left: 50%;
    top: 50%;
    text-align: center;
    background-color: rgb(227, 227, 227);
    width: 12.5rem;
    padding: 2px;
    transform: translate(-100px, -150px);
    font-family: serif;
    color: rgb(255, 255, 255);
}

.header {
    height: 3.75rem;
    display: flex;
    float: right;
    line-height: 3.75rem;

    .avatar {
        height: 3.75rem;
        margin-right: 1.25rem;

        .el-avatar {
            width: 2.5rem;
            height: 2.5rem;
            margin: 0 auto;
            margin-top: .625rem;
        }
    }

    .name {
        margin-right: 1.25rem;
        width: fit-content;
        max-width: 60px;
        overflow: hidden;
        color: rgb(243, 243, 243);
    }

    .details {
        position: relative;

        .box {
            width: fit-content;
            min-width: 5rem;
            line-height: 0;
            position: relative;
            position: absolute;
            right: 0;
            top: 50px;
            background-color: white;
            height: 6.25rem;

            button {
                padding: 10px;
                background-color: rgb(233, 233, 233);
                color: rgb(0, 0, 0);
                font-family: serif;
                font-size: 16px;
            }
        }
    }
}
</style>
