<script setup>
import { ref } from 'vue'
import dayjs from "dayjs";
const tiemr = ref(null)
//进度条
let status = ref("")
let times = ref(null)
let num = ref(0)
function ProgressRun() {
    clearInterval(times.value)
    times.value = setInterval(() => {
        if (num.value == 100 || num.value > 100) {
            status.value = "success"
            clearInterval(times.value)
        } else {
            // console.log(Math.floor(Math.random() * 30) + 1);
            num.value = num.value + Math.floor(Math.random() * 30) + 1
            if (num.value >= 100) {
                num.value = 100
            }
        }
    }, 1000);
}
ProgressRun()
window.addEventListener("mousedown", () => {
    console.log(1);

})
</script>

<template>
    <div class='box'>
        <el-progress :percentage="num" :status="status" />
    </div>
</template>

<style scoped>
.demo-progress .el-progress--line {
    margin-bottom: 15px;
    max-width: 600px;
}
</style>
