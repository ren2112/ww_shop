import http from "@/utils/http";

export function findNewCartListAPI(){
    return http.get('/member/cart')
}

export function insertCartAPI(sku){
    return http.post('/member/cart',sku)
}

export const delCartAPI=(ids)=>{
    return http.delete('/member/cart',{data:{ids}})
}

// 合并购物车
export function mergeCartAPI(data){
    return http.post('/member/cart/merge',data)
}

// 修改购物项
export function updateCartItem(skuId,data){
    return http.put(`/member/cart/${skuId}`,data)
}