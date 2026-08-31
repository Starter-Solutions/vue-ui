<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { parseDate } from '@internationalized/date'
import { CalendarClock, Check } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import { Button } from '@/components/base/button'
import { Calendar } from '@/components/base/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/base/popover'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/base/select'

const props = withDefaults(defineProps<{
    modelValue: string
    disabled?: boolean
    fullWidth?: boolean
    locale?: string
}>(), {
    disabled: false,
    fullWidth: false,
    locale: 'de-DE',
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const open = ref(false)
const draftDate = ref<DateValue>()
const draftHour = ref('00')
const draftMinute = ref('00')

const hourOptions = Array.from({ length: 24 }, (_, hour) =>
    String(hour).padStart(2, '0'),
)
const minuteOptions = Array.from({ length: 60 }, (_, minute) =>
    String(minute).padStart(2, '0'),
)
const dateFormatter = computed(() => new Intl.DateTimeFormat(props.locale, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
}))

const normalizedValue = computed(() => normalizeDateTime(props.modelValue))
const draftValue = computed(() =>
    draftDate.value
        ? `${draftDate.value.toString()}T${draftHour.value}:${draftMinute.value}`
        : '',
)
const hasChanges = computed(
    () => draftValue.value !== '' && draftValue.value !== normalizedValue.value,
)

watch(open, (isOpen) => {
    if (isOpen) {
        resetDraft()
    }
})

function normalizeDateTime(value: string): string {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}):(\d{2})/)

    return match ? `${match[1]}T${match[2]}:${match[3]}` : ''
}

function resetDraft() {
    const value = normalizedValue.value

    if (!value) {
        draftDate.value = undefined
        draftHour.value = '00'
        draftMinute.value = '00'
        return
    }

    draftDate.value = parseDate(value.slice(0, 10))
    draftHour.value = value.slice(11, 13)
    draftMinute.value = value.slice(14, 16)
}

function displayDate(value: string): string {
    const normalized = normalizeDateTime(value)

    if (!normalized) {
        return 'Datum auswählen'
    }

    const [datePart] = normalized.split('T')
    const [year, month, day] = datePart.split('-').map(Number)

    return dateFormatter.value.format(new Date(year, month - 1, day))
}

function displayTime(value: string): string {
    const normalized = normalizeDateTime(value)

    return normalized ? normalized.slice(11, 16) : '--:--'
}

function confirmDraft() {
    if (!draftValue.value) {
        return
    }

    emit('update:modelValue', draftValue.value)
    open.value = false
}
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                type="button"
                variant="outline"
                :class="[
                    'gap-2 bg-muted/30 font-normal hover:border-primary/60 hover:bg-muted/50',
                    fullWidth && 'w-full justify-start',
                ]"
                :disabled="disabled"
            >
                <CalendarClock class="size-4 shrink-0 text-primary" />
                <span class="font-medium">{{ displayDate(modelValue) }}</span>
                <span class="text-muted-foreground">um</span>
                <span class="font-semibold">{{ displayTime(modelValue) }} Uhr</span>
            </Button>
        </PopoverTrigger>

        <PopoverContent align="start" :side-offset="8" class="w-auto p-0">
            <div class="flex flex-col sm:flex-row">
                <Calendar
                    v-model="draftDate"
                    :locale="locale"
                    :week-starts-on="1"
                    initial-focus
                />

                <div class="flex min-h-52 flex-col border-t p-3 sm:w-48 sm:border-t-0 sm:border-l">
                    <p class="mb-2 text-sm font-medium">Uhrzeit</p>
                    <div class="grid grid-cols-2 gap-2">
                        <Select v-model="draftHour">
                            <SelectTrigger class="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="hour in hourOptions"
                                    :key="hour"
                                    :value="hour"
                                >
                                    {{ hour }}
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select v-model="draftMinute">
                            <SelectTrigger class="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    v-for="minute in minuteOptions"
                                    :key="minute"
                                    :value="minute"
                                >
                                    {{ minute }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <p class="mt-2 text-xs text-muted-foreground">Stunde · Minute</p>
                    <Button
                        type="button"
                        class="mt-auto w-full"
                        :disabled="!hasChanges"
                        @click="confirmDraft"
                    >
                        <Check class="size-4" />
                        Übernehmen
                    </Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>
