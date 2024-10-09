<script lang="ts" setup>
import { inject } from 'vue';

const dayJS = inject("dayJS")

const eventData = {
  title: '',
  startDate: '',
  endDate: null,
}

const menu = ref(false)

const accountDataLocal = ref(eventData)
const date = ref(null)

const onChange = (value) => {
  console.log('onChange',value)
  accountDataLocal.value.startDate = dayJS(value).format("YYYY-MM-DD HH:mm")
  date.value = value
}

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
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.title"
                  label="Name"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
              {{accountDataLocal}}
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    :model-value="accountDataLocal.startDate"
                    variant="outlined"
                    append-inner-icon="mdi-calendar"
                    label="Select start date"
                  />
                </template>
                <v-date-picker
                  :model-value="date"
                  @update:modelValue="onChange"
                />
              </v-menu>
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.title"
                  label="Name"
                />
              </VCol>
            </VRow>
            <VRow>
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
