import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {useUserStore} from '@/stores/userStore'
import {findNewCartListAPI,insertCartAPI} from '@/apis/cart'
import { delCartAPI,updateCartItem } from "../apis/cart";

export const useCartStore=defineStore(
    'cart',
    ()=>{
        const cartList=ref([])
        // 需要判断是否登录
        const userStore=useUserStore()
        const isLogin=computed(()=>userStore.userInfo.token)
        // 获取登录后的购物车列表
        const updateLoginCartList=async()=>{
            const res=await findNewCartListAPI()
            cartList.value=res.result
        }
        
        const addCart=async(goods)=>{
            // 如果登录了，每次添加购物车都需要把数据请求到数据库里面
            if(isLogin.value){
                console.log(111);
                await insertCartAPI(goods)
                await updateLoginCartList()
            }
            else{
                const findList=cartList.value.find(item=>goods.skuId===item.skuId)
                if(findList){
                    findList.count+=goods.count
                }
                else{
                    cartList.value.push(goods)
                }   
            }
        }
        // 清除购物车
        const clearCart=()=>{
            cartList.value=[]
        }

        // 修改购物项
        const updateCart=async(goods)=>{
            const {skuId,count,selected}=goods
            if(isLogin.value){
                await updateCartItem(skuId,{count,selected})
            }
        }

        const delCart=async(skuId)=>{
            if(isLogin.value){
                await delCartAPI([skuId])
                await updateLoginCartList()
            }
            else{
                const index=cartList.value.findIndex(item=>item.skuId===skuId)
                cartList.value.splice(index,1)
            }
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

        // 全选功能：
        const checkAll=(selected)=>{
            cartList.value.forEach(item=>{
                item.selected=selected
                updateCart(item)
            })

        }

        // 计算是否全选
        const isAll=computed(()=>{
            let res=true
            cartList.value.forEach(item=>{
                if(!item.selected){
                    res=false
                }
            })
            return res
        })

        // 计算勾选的汇总数量
        const selectedCount=computed(()=>{
            let cnt=0;
            cartList.value.forEach(item=>{
                if(item.selected){
                    cnt+=item.count
                }
            })
            return cnt
        })

        // 计算已选价格
        const selectedPrice=computed(()=>{
            let price=0
            cartList.value.forEach(item=>{
                if(item.selected){
                    price+=item.price*item.count
                }
            })
            return price.toFixed(2)
        })
        return{
            cartList,
            addCart,
            delCart,
            allCount,
            allPrice,
            checkAll,
            isAll,
            selectedCount,
            selectedPrice,
            updateLoginCartList,
            clearCart,
            updateCart
        }
    },
    {
        persist:true
    }
)