<template>
  <!-- Modal -->
  <form w:p="x-4 y-4" w:bg="white" w:border="1 gray-100" w:m="b-5" @submit="onSubmit">
    <div class="card-body">
      <textarea
        v-model="content"
        name="content"
        w:w="full"
        w:border="1 "
        w:p="x-4 y-2"
        :class="contentError ? 'border-red-500' : ''"
        rows="3"
        placeholder="What's happening"
      ></textarea>
      <div v-if="contentError" w:text="red-500 sm">{{ contentError }}</div>
    </div>
    <div class="card-footer" w:display="flex" w:justify="content-end">
      <button
        type="submit"
        w:bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
        w:text="sm white"
        w:font="mono light"
        w:p="x-4 y-2"
        w:align="items-center"
        w:justify="center"
        w:border="2 rounded blue-200"
        :disabled="isSubmitting"
      >
        Tweet
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

import { usePostStore } from '@/stores/posts'

const posts = usePostStore()

const formValues = {
  content: '',
}

const schema = yup.object({
  content: yup.string().required().max(140),
})

const { meta, handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formValues,
})

const onSubmit = handleSubmit((values) => {
  posts.addPost(values.content)
  resetForm()
})

const { value: content, errorMessage: contentError } = useField('content')
</script>
