<script setup lang="ts">
import { useTimerStore } from "@/stores/timer"
import { storeToRefs } from "pinia"

const { formattedElapsedTime } = storeToRefs(useTimerStore())
</script>

<template>
  <span>⏳ {{ formattedElapsedTime }}</span>
</template>
