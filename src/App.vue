<script setup lang="ts">
import GamePanel from "@/components/GamePanel.vue"
</script>

<template>
  <div
    class="flex items-center justify-center w-screen h-screen"
    :class="`mode-space`"
  >
    <GamePanel />
  </div>
</template>
