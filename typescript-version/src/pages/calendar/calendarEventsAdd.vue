<script lang="ts" setup>

const eventData = {
  title: '',
}

const accountDataLocal = ref(structuredClone(eventData))

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Event details">
        <VCardText>
          <VForm class="mt-6">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.title"
                  label="Title"
                />
              </VCol>
              
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn>Save</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
