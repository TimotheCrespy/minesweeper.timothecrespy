<script setup lang="ts">
import { isMobile } from "@/utils/isMobile"
</script>

<template>
  <div class="flex flex-col items-center justify-center text-gray-300">
    <span class="mb-1">Reveal all cells without a bomb.</span>
    <span class="mb-1">
      <strong v-if="isMobile()" class="p-1 border rounded">Tap</strong>
      <strong v-else class="p-1 border rounded">Left click</strong>
      to reveal cell
    </span>
    <span class="mb-1">
      <strong v-if="isMobile()" class="p-1 border rounded">Double tap</strong>
      <strong v-else class="p-1 border rounded">Right click</strong>
      to flag cell
    </span>
    <span>
      <button v-if="isMobile()" class="px-1 border rounded">Click here</button>
      <strong v-else class="p-1 border rounded">Spacebar</strong>
      to restart game
    </span>
  </div>
</template>
