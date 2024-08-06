<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { email, required, sameAs } from '@vuelidate/validators';
import { useAttrs } from 'vue';

const attrs = useAttrs();

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const rules = {
  username: { required },
  email: { required, email },
  password: { required },
  privacyPolicies: sameAs(true),
}

const v$ = useVuelidate(rules, form.value)


const errors = computed(() => {
  const errors = v$.value.username.$errors;
  if(!Array.isArray(errors)){
    return attrs['error-messages'] as string[];
  }
  return [errors.map(error => error.$message),...attrs['error-messages'] as string[]];
})

const handleBlur = () => {}
const handleInput = () => {}

</script>

<template>
  <div class="v-c-text-field">
    <VTextField
      v-bind="$attrs"
      :error-messages="errors"
      @blur="handleBlur"
      @input="handleInput"
    >
      <template v-for="_, name in $slots"  #[name]="scope">
        <slot :name="name" v-bind="scope"/>
      </template>
    </VTextField>
  </div>
</template>
