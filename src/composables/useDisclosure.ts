import { ref, readonly, type DeepReadonly, type Ref } from 'vue'

export interface DisclosureState {
    isOpen: DeepReadonly<Ref<boolean>>
    open: () => void
    close: () => void
    toggle: () => void
}

export function useDisclosure(initialValue = false): DisclosureState {
    const isOpen = ref(initialValue)

    return {
        isOpen: readonly(isOpen),
        open: () => { isOpen.value = true },
        close: () => { isOpen.value = false },
        toggle: () => { isOpen.value = !isOpen.value },
    }
}
