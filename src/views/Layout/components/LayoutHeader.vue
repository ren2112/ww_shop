<script setup>
import { useCategoryStore } from '@/stores/categoryStore';
import HeaderCart from './HeaderCart.vue';
const categoryStore=useCategoryStore()

</script>
<template>
  <header class="app-header">
    <div class="container">
        <h1 class="logo">
            <router-link to="/">旺旺商城</router-link>
        </h1>
        <ul class="app-header-nav">
            <li class="home">
                <router-link to="/">首页</router-link>
            </li>
            <li v-for="item in categoryStore.categoryList" :key="item.id"> 
                <router-link active-class="active" :to=" `/category/${item.id}`">{{ item.name }}</router-link>
            </li>
        </ul>
        <div class="search">
            <i class="iconfont icon-search"></i>
            <input type="text" placeholder="搜一搜">
        </div>
        <!-- 购物车 -->
        <HeaderCart/>
    </div>
  </header>
</template>


<style lang="scss" scoped>
.app-header{
    background: #fff;
    .container{
        display: flex;
        align-items: center;
    }
    .logo{
        width: 200px;
        // router-link包含了a
        // 注意a是行元素，text-indent只对块有效，因此使用block
        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px;
            background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
        }
    }
    .app-header-nav{
        width: 820px;
        display: flex;
        padding-left: 40px;
        position: relative;
        // z-index: 998;
        li{
            margin-left: 40px;
            width: 38px;
            text-align: center;

            a{
                font-size: 16px;
                line-height: 32px;
                height: 32px;
                display: inline-block;

                &:hover{
                    color: $xtxColor;
                    border-bottom: 1px solid $xtxColor;
                }
            }
            .active {
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }
    }

    .search{
        margin-left: 40px;
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom:1px solid #e7e7e7;
        line-height: 32px;
        display: flex;

        .icon-search{
            font-size: 18px;
            margin-left: 5px;
            // display: inline-block;
        }
        
        input{
            width: 140px;
            padding-left: 5px;
            color: #666;
        }
    }
    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: $helpColor;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>
