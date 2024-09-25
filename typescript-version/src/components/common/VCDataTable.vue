<script setup lang="ts">
import { VDataTableServer } from 'vuetify/lib/components/index.mjs';


</script>

<template>
  <VDataTableServer 
    v-bind="$attrs"
  >
    <template v-for="_, name in $slots"  #[name]="scope">
      <slot :name="name" v-bind="scope"/>
    </template>
  </VDataTableServer>
</template>
