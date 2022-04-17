<template>
  <!-- Modal -->
  <button
    w:display="flex"
    w:bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
    w:text="sm white"
    w:font="mono light"
    w:w="60px"
    w:h="60px"
    w:align="items-center"
    w:justify="center"
    w:border="2 rounded-1/2 blue-200"
    w:position="fixed bottom-5 right-5"
    @click="openModal"
  >
    <FontAwesomeIcon icon="plus" />
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-4 overflow-hidden text-left transition-all transform bg-white shadow-xl"
            >
              <form @submit="onSubmit">
                <div w:m="b-5">
                  <textarea
                    v-model="content"
                    name="content"
                    w:w="full"
                    w:border="1 "
                    w:p="x-4 y-2"
                    :class="contentError ? 'is-invalid' : ''"
                    rows="3"
                    placeholder="What's happening"
                  ></textarea>
                  <div v-if="contentError" w:text="red-500 sm">{{ contentError }}</div>
                </div>
                <div w:display="flex" w:justify="content-end">
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
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from '@headlessui/vue'
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

import { usePostStore } from '@/stores/posts'

const isOpen = ref(false)

const posts = usePostStore()

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

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
  isOpen.value = false
})

const { value: content, errorMessage: contentError } = useField('content')
</script>
