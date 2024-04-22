import http from "@/utils/http"

export const getCheckInfoAPI=()=>{
    return http.get('/member/order/pre')
}

export const createOrderAPI=(data)=>{
    return http.post('/member/order',data)
}