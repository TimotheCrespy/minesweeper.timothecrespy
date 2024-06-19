<script setup lang="ts">
import { useBombsStore } from "@/stores/bombs"
import { storeToRefs } from "pinia"

const { bombCount, remainingBombCounter } = storeToRefs(useBombsStore())
</script>

<template>
  <span>💣 {{ remainingBombCounter }}/{{ bombCount }}</span>
</template>
