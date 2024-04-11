<script setup>
import LayoutFixed from './components/LayoutFixed.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNav from './components/LayoutNav.vue';


</script>

<template>
    <!-- 我是首页 -->
    <LayoutFixed/>
    <LayoutNav/>
    <LayoutHeader/>
    <router-view/>
    <LayoutFooter/>
</template>

<style lang="scss" scoped>
</style>
