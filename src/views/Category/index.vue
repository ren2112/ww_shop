<script setup>
import {getTopCategoryAPI} from '@/apis/category'
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, onUpdated, ref} from "vue";
import { getBannerAPI } from '@/apis/home';
import GoodsItem from '../Home/components/GoodsItem.vue';

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


// 轮播图：
const bannerList=ref([])
const getBanner=async ()=>{
const res=await getBannerAPI('2')
  bannerList.value=res.result
}
onMounted(()=>getBanner());

</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px" motion-blur>
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
  
      <!-- 分类里面的二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img v-img-lazy="i.picture" alt="">
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
  
      <!-- 商品展示 -->
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>{{ item.name }}</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id"></GoodsItem>
        </div>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      justify-content: center;
      padding: 0 32px;
      flex-wrap: wrap;
      // margin: 0 auto;
      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}


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
  // position: absolute;
  // left: 0;
  // top: 0;
  margin: 0 auto;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
