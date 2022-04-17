<route lang="yaml">
meta:
  layout: main
  public: true
</route>

<script setup lang="ts">
import { useMq } from 'vue3-mq'

import PostCard from '@/components/Post/PostCard.vue'
import PostModal from '@/components/Post/PostModal.vue'
import PostForm from '@/components/Post/PostForm.vue'

import { usePostStore } from '@/stores/posts'

const posts = usePostStore()

const mq = useMq()
</script>

<template>
  <div w:max-w="md:1/2" w:m="x-auto">
    <PostForm v-if="mq.current !== 'xs'" />

    <template v-if="posts.items.length > 0">
      <PostCard v-for="item in posts.items" :key="item.id" :data="item" />
    </template>
    <template v-else>
      <div class="text-center">Belum ada post</div>
    </template>

    <PostModal v-if="mq.current === 'xs'" />
  </div>
</template>
<style lang="scss" scoped></style>
