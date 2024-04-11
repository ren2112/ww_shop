
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  // ref识别成state
  const categoryList=ref([])
  
  // 函数就是actions
  const getCategory=()=>{
    if(categoryList.value.length==0){
      getCategoryAPI().then(res=>{
          categoryList.value=res.result
      })
    }
    categoryList.value=[1,2,3]
  }
  onMounted(()=>{
    console.log(categoryList.value);
    getCategory()
  })

  return { categoryList, getCategory }
})
