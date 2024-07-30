<script setup lang="ts">
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useTheme } from 'vuetify'

import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'

import { useVuelidate } from '@vuelidate/core'
import { email, required, sameAs } from '@vuelidate/validators'

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

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? authV1MaskLight
    : authV1MaskDark
})

const userNameErrors = computed(() => {
  const errors = v$.value.username.$errors;
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
  const res = await fetch("http://localhost:3000/v1/auth/register",{
    method: 'POST',
    body: JSON.stringify(form.value)
  });
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">

    <!--<VCTextField> 
      <template #prepend="{id, reset}">asdf : {{ id }} {{  reset }}</template>
    </VCTextField>-->
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
                v-model="form.username"
                label="Username"
                :error-messages="userNameErrors"
                @blur="v$.username.$touch"
                @input="v$.username.$touch"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >privacy policy & terms</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
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
