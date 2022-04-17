import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { Post } from '@/models/post'

export type RootState = {
  items: Post[]
}

export const usePostStore = defineStore('post', {
  state: () =>
    ({
      items: [],
    } as RootState),
  actions: {
    addPost(post: string) {
      const tmpItem = {
        id: Date.now(),
        content: post,
        posted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }
      this.items.unshift(tmpItem)
    },
    deletePost(id: number) {
      const tmpItem = [...this.items]
      const tmpIndex = tmpItem.findIndex((item) => {
        return item.id === id
      })
      this.items.splice(tmpIndex, 1)
    },
  },
  persist: true,
})
