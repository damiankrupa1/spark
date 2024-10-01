<script setup lang="ts">
import VCDataTable from '@/components/common/VCDataTable.vue';
import { axiosInstance } from '@/plugins/axios';
import { crudCalendarEvents } from '@/types/Crud/crudCalendarEvents';
import { crudResponse } from '@/types/crud';
import { AxiosResponse } from 'axios';

let loading = ref(false);
let calendarEvents = ref<AxiosResponse<crudResponse<crudCalendarEvents>>>();

const headers = ref([
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Start',
    key: 'start',
  },
  {
    title: 'End',
    key: 'end',
  },
  {
    title: 'Color',
    key: 'color',
  },
])

const totalItems = computed(() => {
  return calendarEvents.value?.data.totalResults ?? 0;
})

const items = computed(() => {
  return calendarEvents.value?.data.results ?? [];
})

const loadItems = async () => {
  loading.value = true;
  calendarEvents.value = await axiosInstance.get('/calendar');
  loading.value = false;
  return calendarEvents;
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Calendar events">
        <VRow justify="end" class="mb-5">
          <VCol cols="2">
            <VBtn
              block
              type="submit"
              :to="{name: 'addCalendarEvents'}"
            >
              Add event
            </VBtn>
          </VCol>
        </VRow>
        <VCDataTable 
          :loading="loading"
          :headers="headers"
          :items-length="totalItems"
          :items="items"
          @update:options="loadItems"
        />
      </VCard>
    </VCol>
  </VRow>
</template>
