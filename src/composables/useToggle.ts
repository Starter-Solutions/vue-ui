import { ref, type Ref } from 'vue'

export interface ToggleState {
    value: Ref<boolean>
    on: () => void
    off: () => void
    toggle: () => void
}

export function useToggle(initialValue = false): ToggleState {
    const value = ref(initialValue)

    return {
        value,
        on: () => { value.value = true },
        off: () => { value.value = false },
        toggle: () => { value.value = !value.value },
    }
}
