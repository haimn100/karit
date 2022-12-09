<script setup lang="ts">
import { ref, onMounted } from "vue";
import { login } from "@src/services/user";
import { requestApi } from "@src/services/api";
import FormBase from "@src/components/forms/FormBase.vue";
import { useRouter } from 'vue-router';

const route = useRouter();

onMounted(async () => {
  //for csrf cookie to be set
  await requestApi({ path: "account/csrf" });
});

const onSubmit = async (data: any, node: any) => {
  node.clearErrors();
  const res = await login(data.username, data.password);
  res.ok ? route.push('/') : node.setErrors([res.reason]);
};

</script>

<template>
  <FormBase v-slot="props" :submit="onSubmit">
    <h1>Login</h1>
    <FormKit type="text" name="username" label="User" validation="required" />
    <FormKit type="password" name="password" label="Password" validation="required|length:4|matches:/[^a-zA-Z]/"
      :validation-messages="{
        matches: 'Please include at least one symbol',
      }" placeholder="Your password" help="Choose an account password" />

  </FormBase>
</template>
