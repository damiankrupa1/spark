<script setup lang="ts">
import { useUserSessionStore } from '@/store/userSession'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

const form = ref({
  name: '',
  email: '',
  password: '',
})

const rules = {
  name: { required },
  email: { required, email },
  password: { required },
}

const userSession = useUserSessionStore()

const v$ = useVuelidate(rules, form.value)

const userNameErrors = computed(() => {
  const errors = v$.value.name.$errors;
  if(!Array.isArray(errors)){
    return [];
  }
  return errors.map(error => error.$message)
})
const passwordErrors = computed(() => {
  const errors = v$.value.password.$errors;
  if(!Array.isArray(errors)){
    return [];
  }
  return errors.map(error => error.$message)
})
const emailErrors = computed(() => {
  const errors = v$.value.email.$errors;
  if(!Array.isArray(errors)){
    return [];
  }
  return errors.map(error => error.$message)
})

const isPasswordVisible = ref(false)

const handleSubmit = async () => {
  v$.value.$touch();
  if(v$.value.$invalid){
    return;
  }
  await userSession.register(form.value)
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          LuxSoftware
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Adventure starts here 🚀
        </h5>
        <p class="mb-0">
          Make your life management easy and fun!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="handleSubmit">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                label="Username"
                :error-messages="userNameErrors"
                @blur="v$.name.$touch"
                @input="v$.name.$touch"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
                :error-messages="emailErrors"
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                :error-messages="passwordErrors"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                @blur="v$.password.$touch"
                @input="v$.password.$touch"
              />

              <VBtn
                block
                type="submit"
                class="mt-8"
              >
                Sign up
              </VBtn>
            </VCol>

            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
