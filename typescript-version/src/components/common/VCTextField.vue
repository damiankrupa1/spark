<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'

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


const userNameErrors = computed(() => {
  const errors = v$.value.username.$errors;
  if(!Array.isArray(errors)){
    return [];
  }
  return errors.map(error => error.$message)
})

</script>

<template>
  <div class="v-c-text-field">
    <VTextField
      v-bind="$attrs"
    >
      <template v-for="slot, name in $slots"  #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </VTextField>
  </div>
</template>