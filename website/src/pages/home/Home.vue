<script lang="ts" setup>
import FormModel from "@src/components/forms/FormModel.vue"
import { Reservation } from "@src/apps/reservations/Reservation"
import { ref, onMounted } from "vue";
import { requestApi } from "@src/services/api";


let data: any = ref({});

onMounted(async () => {
  //for csrf cookie to be set
  //await requestApi({ path: "account/login" });
  let b: any = await new Reservation().all();
  data.value = b[0];
});
</script>

<template>

  <FormModel v-if="data.id" :model="Reservation"></FormModel>
</template>
