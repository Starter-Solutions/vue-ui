import { onMounted, readonly, ref } from 'vue'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = Exclude<Theme, 'system'>

const theme = ref<Theme>('system')
const resolvedTheme = ref<ResolvedTheme>('light')
let initialized = false
let mediaQuery: MediaQueryList | undefined

function isTheme(value: string | null): value is Theme {
    return value === 'light' || value === 'dark' || value === 'system'
}

function applyTheme() {
    if (typeof window === 'undefined') {
        return
    }

    const resolved = theme.value === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme.value

    resolvedTheme.value = resolved
    document.documentElement.classList.toggle('dark', resolved === 'dark')
    document.documentElement.style.colorScheme = resolved
}

export function initializeTheme(storageKey = 'theme') {
    if (initialized || typeof window === 'undefined') {
        return
    }

    initialized = true
    const storedTheme = window.localStorage.getItem(storageKey)

    if (isTheme(storedTheme)) {
        theme.value = storedTheme
    }

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', applyTheme)
    applyTheme()
}

export function useTheme(storageKey = 'theme') {
    onMounted(() => initializeTheme(storageKey))

    function setTheme(value: Theme) {
        theme.value = value

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(storageKey, value)
        }

        applyTheme()
    }

    return {
        theme: readonly(theme),
        resolvedTheme: readonly(resolvedTheme),
        setTheme,
    }
}
