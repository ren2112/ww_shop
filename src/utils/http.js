import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios'
import { ElMessage } from 'element-plus';
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import "element-plus/theme-chalk/el-loading.css";
const http=axios.create({
    baseURL:"http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout:5000
})

let loading=null
http.interceptors.request.use(config=>{
    loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    //   每次请求都要发送token
    const userStore=useUserStore()
    const token=userStore.userInfo.token
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},e=>Promise.reject(e))

http.interceptors.response.use(res=>{
    res.data
    loading.close()
    return res.data
},e=>{
    loading.close()
    // 统一错误提示
    ElMessage({type:'error',message:e.response?.data.message})
    // 401表示token失效
    const userStore=useUserStore()
    if(e.response?.status===401){
        userStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default http