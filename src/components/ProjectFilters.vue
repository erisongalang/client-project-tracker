<template>
  <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
    <div class="flex-1">
      <label for="search" class="sr-only">Search projects</label>
      <input
        id="search"
        type="text"
        :value="modelValue.search"
        @input="updateFilter('search', $targetValue($event))"
        placeholder="Search by client or project name..."
        class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      />
    </div>

    <div class="w-full md:w-48">
      <select
        :value="modelValue.status"
        @change="updateFilter('status', $targetValue($event))"
        class="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
      >
        <option value="">All Statuses</option>
        <option value="Planning">Planning</option>
        <option value="In Progress">In Progress</option>
        <option value="On Hold">On Hold</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    <div class="w-full md:w-44">
      <select
        :value="modelValue.priority"
        @change="updateFilter('priority', $targetValue($event))"
        class="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    <div class="w-full md:w-48">
      <select
        :value="modelValue.sortBy"
        @change="updateFilter('sortBy', $targetValue($event))"
        class="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
      >
        <option value="dueDate-asc">Due Date (Soonest)</option>
        <option value="dueDate-desc">Due Date (Furthest)</option>
        <option value="priority-desc">Priority (High to Low)</option>
        <option value="clientName-asc">Client Name (A-Z)</option>
      </select>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const $targetValue = (event) => event.target.value

const updateFilter = (key, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script>