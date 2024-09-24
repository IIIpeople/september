<script setup>
import { ref, onMounted } from 'vue'
import dayjs from "dayjs";
const num = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
const result = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60])
const tiemr = ref(null)
onMounted(() => {
    GetDiv()
    Init()//初始化
    RunTime()
})
function GetDiv() {
    for (let i = 0; i < num.value.length; i++) {
        let doc = document.querySelector(`.指针${num.value[i]}`)
        if (doc != null) {
            doc.style.width = '100px'
            doc.style.height = '1px'
            // doc.style.backgroundColor = '#585858'
            doc.style.transform = `rotate(${i * 30}deg)`
        }
    }
    for (let i = 0; i < result.value.length; i++) {
        let doc = document.querySelector(`.秒针${result.value[i]}`)
        if (doc != null) {
            doc.style.width = '100px'
            doc.style.height = '1px'
            // doc.style.backgroundColor = '#585858'
            doc.style.transform = `rotate(${i * 6}deg)`
        }
    }
}
// 闹钟Running
let time = ref(null)
function RunTime() {
    clearInterval(tiemr.value)
    tiemr.value = setInterval(() => {
        BellRuning()
        // clearInterval(tiemr.value)
    }, 1000);
}

function BellRuning() {
    Init()
}
function Init() {
    time.value = dayjs(Date.now()).format('hh:mm:ss')
    // console.log(time.value.split(':'));
    let [HH, MM, SS] = time.value.split(':')
    // console.log(dayjs(Date.now()).format('hh:mm:ss'));
    let hh = document.querySelector(`#时针lines`)
    if (hh == null) {
        // HH = 12
        clearInterval(tiemr.value)
        return
    }
    let mm = document.querySelector(`#分针lines`)
    let ss = document.querySelector(`#秒针lines`)
    //初始旋转角度为0°的时候 
    //时针旋转角度 4点
    let rotateHH = (HH - 3) * 30
    // console.log(rotateHH);
    hh.style.transform = `rotate(${rotateHH}deg)`
    //分针旋转角度  50分钟
    let rotateMM = (MM - 15) * 6
    // console.log(rotateMM);
    mm.style.transform = `rotate(${rotateMM}deg)`
    //秒针旋转角度 20秒
    let rotateSS = (SS - 15) * 6
    // console.log(rotateSS);
    ss.style.transform = `rotate(${rotateSS}deg)`
    //初始旋转角度为-90°的时候
    //时针旋转角度
    // let rotateHH = (HH * 30) - 90
    // // console.log(rotateHH);
    // hh.style.transform = `rotate(${rotateHH}deg)`
    // //分针旋转角度
    // let rotateMM = (MM * 6) - 90
    // // console.log(rotateMM);
    // mm.style.transform = `rotate(${rotateMM}deg)`
    // //秒针旋转角度
    // let rotateSS = (SS * 6) - 90
    // // console.log(rotateSS);
    // ss.style.transform = `rotate(${rotateSS}deg)`
}
</script>

<template>
    <div class='box'>
        <div class="yuan">
            <div id="指针A" :class="'指针' + item" v-for="(item, index) in 6" :key="index">
            </div>
            <div id="秒针A" :class="'秒针' + item" v-for="(item, index) in result" :key="index">
            </div>
            <div class="覆盖"></div>
            <div class="覆盖1"></div>
            <div class="圆心"></div>
            <div id="时针lines"></div>
            <div id="分针lines"></div>
            <div id="秒针lines"></div>
            <div id="num12-6">
                <div style="margin-bottom: 50px;">
                    12
                </div>
                <div style="padding-left: 3px;">
                    6
                </div>
            </div>
            <div id="num1-5">
                <div style="margin-bottom: 40px;">
                    1
                </div>
                <div>
                    5
                </div>
            </div>
            <div id="num2-4">
                <div style="margin-bottom: 16px;">
                    2
                </div>
                <div>
                    4
                </div>
            </div>
            <div id="num9-3">
                <div style="width: 74px;">
                    9
                </div>
                <div>
                    3
                </div>
            </div>
            <div id="num11-7">
                <div style="margin-bottom: 40px;">
                    11
                </div>
                <div>
                    7
                </div>
            </div>
            <div id="num10-8">
                <div style="margin-bottom: 16px;">
                    10
                </div>
                <div>
                    8
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('./list.css');

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
