<script setup lang="ts">
import { Qalendar } from "qalendar";

const events = ref([
  {
    title: "Advanced algebra",
    with: "Chandler Bing",
    time: { start: "2024-09-28 12:05", end: "2024-09-28 13:35" },
    color: "yellow",
    isEditable: true,
    id: "753944708f0f",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
  },
  {
    title: "Ralph on holiday",
    with: "Rachel Greene",
    time: { start: "2024-09-28", end: "2024-09-28" },
    color: "green",
    isEditable: true,
    id: "5602b6f589fc"
  }
])

const config = ref({
  week: {
    startsOn: 'monday',
    nDays: 7,
      scrollToHour: 5,
  },
  month: {
    showTrailingAndLeadingDates: false,
  },
  locale: 'pl-PL',
  defaultMode: 'week',
  isSilent: true,
  showCurrentTime: true, 
})

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Calendar">
        <Qalendar 
          :events="events"
          :config="config"
        />
      </VCard>
    </VCol>
  </VRow>
</template>
<style>
    @import "qalendar/dist/style.css";
</style>
