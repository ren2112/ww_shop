import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore=defineStore(
    'cart',
    ()=>{
        const cartList=ref([])
        const addCart=(goods)=>{
            const findList=cartList.value.find(item=>goods.skuId===item.skuId)
            if(findList){
                findList.count+=goods.count
            }
            else{
                cartList.value.push(goods)
            }
        }
        const delCart=(skuId)=>{
            const index=cartList.value.findIndex(item=>item.skuId===skuId)
            cartList.value.splice(index,1)
        }
        // 求总数
        const allCount=computed(()=>{
            let cnt=0;
            cartList.value.forEach(item=>{
                cnt+=item.count
            })
            return cnt
        })
        // 求总金额
        const allPrice=computed(()=>{
            let res=0;
            cartList.value.forEach(item=>{
                res+=item.price*item.count
            })
            return res.toFixed(2)
        })
        return{
            cartList,
            addCart,
            delCart,
            allCount,
            allPrice,
        }
    },
    {
        persist:true
    }
)