import { onMounted, onUnmounted } from "vue"

export function useKeyupEvent(handler: (event: KeyboardEvent) => void): void {
  onMounted(() => document.addEventListener("keyup", handler))
  onUnmounted(() => document.removeEventListener("keyup", handler))
}
