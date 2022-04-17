<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue'
import { Post } from '@/models/post'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { usePostStore } from '@/stores/posts'

interface Props {
  data?: Post
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    id: 1,
    content: '',
    posted_at: '',
  }),
})

const { data } = toRefs(props)

const posts = usePostStore()

const deleteItem = function (id) {
  posts.deletePost(id)
}
</script>
<template>
  <div w:bg="white" w:border="1 rounded gray-100" w:p="y-2 x-2" class="post-card">
    <div class="flex items-center">
      <div class="post-card--avatar" w:m="r-3 md:r-3" w:max-w="50px md:60px" w:w="full">
        <picture class="relative block" w:p="t-50px md:t-60px">
          <img
            alt="avatar user"
            class="post-card--avatar-img"
            w:w="full"
            w:h="full"
            w:pos="absolute left-0 top-0"
            w:border="2 rounded-1/2"
            src="@/assets/avatar.png"
          />
        </picture>
      </div>
      <div class="flex-grow post-card--holder">
        <div class="post-card--user flex items-center" w:text="sm">
          <div class="post-card--user-name" w:font="bold" w:m="r-1">Rizky</div>
          <div class="post-card--user-username pr-2 mr-2 relative">@rizkyshofyan</div>
          <div class="post-card--user--posted" w:text="gray-400">
            {{ $dayjs(data.posted_at, 'YYYY-MM-DD HH:mm:ss').fromNow() }}
          </div>
        </div>
        <p class="post-card--content p-0 m-0">
          {{ data.content }}
        </p>
        <div w:display="flex" w:justify="content-end">
          <Menu as="div" class="relative inline-block text-left">
            <MenuButton
              :id="`postItem-${data.id}`"
              class="inline-flex justify-center"
              w:bg="white hover:gray-100 opacity-20 hover:opacity-30"
              w:text="sm black "
              w:font="mono light"
              w:p="y-2 x-2"
              w:border="2 rounded-md white hover:gray-100"
            >
              <FontAwesomeIcon icon="ellipsis-v" />
            </MenuButton>
            <MenuItems
              class="
                absolute
                right-0
                w-56
                mt-2
                origin-top-right
                bg-white
                divide-y divide-gray-100
                rounded-md
                shadow-lg
                ring-1 ring-black ring-opacity-5
                focus:outline-none
              "
              w:z="3"
            >
              <div class="px-1 py-1">
                <MenuItem>
                  <a
                    class="flex items-center"
                    w:bg="white hover:gray-200"
                    w:p="y-1 x-2"
                    href="javascript:void(0)"
                    @click="deleteItem(data.id)"
                  >
                    <div class="flex-grow">Delete Post</div>
                    <FontAwesomeIcon icon="trash" />
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.post-card--user-username:after {
  width: 5px;
  height: 5px;
  background-color: #666;
  display: block;
  content: '';
  top: calc(50% - 3px);
  right: -3px;
  position: absolute;
  border-radius: 50%;
}
</style>
