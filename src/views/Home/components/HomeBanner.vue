<script setup>
import { getBannerAPI } from '@/apis/home';
import { onMounted } from 'vue';

const bannerList=ref([])
const getBanner=async ()=>{
  const res=await getBannerAPI()
  bannerList.value=res.result
}

onMounted(()=>{
  getBanner()
})
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px" motion-blur>
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<style lang="scss" scoped>

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.home-banner{
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
