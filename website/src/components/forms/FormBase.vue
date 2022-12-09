<script setup lang="ts">
import { ref } from "vue";

interface Props {
  submit?: (data: any, node: any) => {}
}

const props = defineProps<Props>();

const submitted = ref(false);
const data = ref({});

</script>

<template>
  <FormKit @submit="props.submit" type="form" v-model="data" :form-class="submitted ? 'hide' : 'show'"
    submit-label="Login">
    <slot :data="data"></slot>
  </FormKit>
</template>
