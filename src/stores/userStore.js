import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "../apis/cart";
export const useUserStore=defineStore(
    'user',
    
    ()=>{
        const userInfo=ref({})
        const cartStore=useCartStore()

        const getUserInfo=async(user)=>{
            const res=await loginAPI(user)
            userInfo.value=res.result
            // 这个api本来就是保存数据到数据库里面的
            await mergeCartAPI(cartStore.cartList.map(item=>{
                return {
                    skuId:item.skuId,
                    selected:item.selected,
                    count:item.count
                }
            }))
            await cartStore.updateLoginCartList();
        }
        const clearUserInfo=()=>{
            userInfo.value={}
        }
        return{
            userInfo,
            getUserInfo,
            clearUserInfo
        }
    },
    // 持久化配置
    {
        persist:true
    }
)