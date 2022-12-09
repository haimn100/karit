<script setup lang="ts" context>
import { ref, onMounted } from "vue"
import { createSchema } from '@src/utils/forms';
import { FormKitSchema, submitForm } from "@formkit/vue"
import { getNode } from "@formkit/core";
import { ModelCtr, Model } from "@src/apps/ModelBase";
import { requestApi } from "@src/services/api";
import { ApiResponse } from "@src/utils/network";

const props = defineProps<{ model: ModelCtr, pk?: number }>();
let schema: any = ref([]);
let errors = ref('');
let action: string;

let model: Model = new props.model();
const path = model.path();

onMounted(async () => {

    await requestApi({ path: "account/csrf" });

    if (props.pk) {
        try {
            model = await model.get(props.pk);
            schema.value = createSchema(model.form_fields(), model);
        } catch (e) {
            errors.value = 'Could not load Model';
        }
    } else {
        schema.value = createSchema(model.form_fields(), model);
    }
});

const save = () => {
    action = props.pk ? 'put' : 'post';
    submitForm('modelform');
}

const del = () => {
    action = 'delete';
    submitForm('modelform');
}

const onSubmit = async (payload: any) => {
    let res: ApiResponse;
    try {
        if (action === 'post') res = await model.add(payload);
        if (action === 'put') { model.set(payload); res = await model.save(); }
        if (action === 'delete') res = await model.del();
    }
    catch (ex) {
        res = ex as ApiResponse;
        if (res.status === 400) { // bad request
            Object.entries(res.data).forEach(kv => {
                const node = getNode(kv[0]);
                if (node) node.setErrors(kv[1] as string[]);
            });
        } else {
            getNode('modelform')?.setErrors(res.reason || 'Something went wrong');
        }
    }
    finally {
        console.log('res')
    }
}

</script>   

<template>
    <div v-if="schema.length > 0">
        <FormKit type="form" :actions="false" id="modelform" @submit="onSubmit">
            <FormKitSchema :schema="schema"></FormKitSchema>
        </FormKit>
        <button @click="save">Save</button>
        <button v-if="pk" @click="del">Delete</button>
    </div>
    <div v-if="errors">
        {{  errors  }}
    </div>
</template>
