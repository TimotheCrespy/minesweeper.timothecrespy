<script setup lang="ts">
import BoardSettings from "@/components/settings/BoardSettings.vue"
import BombCounterSettings from "@/components/settings/BombCounterSettings.vue"
import TimerSettings from "@/components/settings/TimerSettings.vue"
</script>

<template>
  <div class="flex flex-col gap-4 py-4 font-mono">
    <BoardSettings />

    <div class="flex items-center justify-between">
      <BombCounterSettings />
      <TimerSettings />
    </div>
  </div>
</template>
