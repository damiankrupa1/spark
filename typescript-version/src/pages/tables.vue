<script setup lang="ts">
import VCDataTable from '@/components/common/VCDataTable.vue';
import { axiosInstance } from '@/plugins/axios';
import { crudUser } from '@/types/Crud/crudUser';
import { crudResponse } from '@/types/crud';
import { AxiosResponse } from 'axios';

let loading = ref(false);
let users = ref<AxiosResponse<crudResponse<crudUser>>>();

const headers = ref([
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Email_Verified',
    key: 'isEmailVerified',
  },
  {
    title: 'Role',
    key: 'role',
  },
])

const totalItems = computed(() => {
  return users.value?.data.totalResults ?? 0;
})

const items = computed(() => {
  return users.value?.data.results ?? [];
})

const loadItems = async () => {
  loading.value = true;
  users.value = await axiosInstance.get('/users');
  loading.value = false;
  return users;
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Users">
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
