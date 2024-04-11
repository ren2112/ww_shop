<script setup>
import { useCategoryStore } from '@/stores/categoryStore';

  const categoryStore=useCategoryStore()
  // categoryStore.categoryList=ref([1,2,3])
  categoryStore.getCategory()
</script>

<template>
  <div>
    我是登录页
    {{ categoryStore.categoryList }}
  </div>
</template>

<style lang="scss" scoped>
</style>
