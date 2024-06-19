<script setup lang="ts">
import { useStatusStore } from "@/stores/status"
import { storeToRefs } from "pinia"

const { status } = storeToRefs(useStatusStore())
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-4">
    <span class="font-mono">{{ status }}</span>
  </div>
</template>
