import dayjs from "dayjs";
import { computed, onUnmounted } from "vue";
export const useCountDown=()=>{
    // 响应式数据
    let timer=null
    const time=ref(0)

    // 格式化时间
    const formatTime=computed(()=>dayjs.unix(time.value).format('mm分ss秒'))

    // 开启倒计时的函数，因为时间是从服务器获取的所以需要传参
    const start=(currentTime)=>{
        time.value=currentTime
        timer=setInterval(()=>{
            time.value--
        },1000)
    }
    
    // 销毁组件需要清除定时器
    onUnmounted(()=>{
        timer&&clearInterval(timer)
    })
    return{
        formatTime,
        start
    }
}