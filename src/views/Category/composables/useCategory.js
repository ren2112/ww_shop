import {getTopCategoryAPI} from '@/apis/category'
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, onUpdated, ref} from "vue";
export function useCategory() {
    // 获得面包屑的当前导航位置
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        //console.log(route.params.id);
        const res = await getTopCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(()=>{
        getCategory(route.params.id)
    })
    // 更新面包屑当前位置
    onBeforeRouteUpdate((to)=>{
        getCategory(to.params.id)
    })
    return {categoryData}
}