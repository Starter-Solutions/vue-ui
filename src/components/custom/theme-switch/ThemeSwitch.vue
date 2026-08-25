<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'
import { computed } from 'vue'
import { Button } from '@/components/base/button'
import { useTheme } from '@/composables/useTheme'

const props = withDefaults(defineProps<{
    storageKey?: string
}>(), {
    storageKey: 'theme',
})

const { resolvedTheme, setTheme } = useTheme(props.storageKey)

const label = computed(() => `Switch to ${resolvedTheme.value === 'dark' ? 'light' : 'dark'} theme`)

function toggleTheme() {
    setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
}
</script>

<template>
    <Button
        variant="outline"
        size="icon"
        :aria-label="label"
        :title="label"
        @click="toggleTheme"
    >
        <Sun v-if="resolvedTheme === 'dark'" />
        <Moon v-else />
        <span class="sr-only">{{ label }}</span>
    </Button>
</template>
