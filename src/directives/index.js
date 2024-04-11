import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin={
    install(app){
        app.directive('img-lazy',{
            // el:指定绑定元素img组件
            // binding.value图片的url
            mounted(el,binding){
                // console.log(el,binding.value);
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }] ) => {
                      if(isIntersecting){
                        el.src = binding.value
                        // stop表示加载过了就不要intersection了
                        stop()
                      }
                    },
                )
              
            }
        })
    }
}