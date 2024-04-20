import Sku from '@/components/sku/index.vue'
import ImageView from '@/components/imageView/index.vue'

export const componentPlugin={
    install(app){
        app.component('ImageView',ImageView)
        app.component('Sku',Sku)
    }
}