<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <div class="relative bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 class="text-lg font-bold text-slate-900">
          {{ isEditMode ? 'Edit Project Details' : 'Launch New Project Track' }}
        </h2>
        <button 
          @click="$emit('close')" 
          class="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="flex-1 overflow-y-auto p-6 space-y-4">
        
        <div>
          <label for="clientName" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Client Name *</label>
          <input
            id="clientName"
            type="text"
            v-model="form.clientName"
            placeholder="e.g., Acme Corporation"
            :class="[errors.clientName ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500']"
            class="w-full px-3 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 transition-shadow"
          />
          <p v-if="errors.clientName" class="text-xs text-rose-600 mt-1 font-medium">{{ errors.clientName }}</p>
        </div>

        <div>
          <label for="projectName" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Project Name *</label>
          <input
            id="projectName"
            type="text"
            v-model="form.projectName"
            placeholder="e.g., Corporate Website Redesign"
            :class="[errors.projectName ? 'border-rose-400 focus:ring-rose-500 focus:border-rose-500' : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500']"
            class="w-full px-3 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 transition-shadow"
          />
          <p v-if="errors.projectName" class="text-xs text-rose-600 mt-1 font-medium">{{ errors.projectName }}</p>
        </div>

        <div>
          <label for="description" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            placeholder="Provide a summary of the project scope and deliverable parameters..."
            class="w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow resize-none"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="status" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Status *</label>
            <select
              id="status"
              v-model="form.status"
              :class="[errors.status ? 'border-rose-400' : 'border-slate-200']"
              class="w-full px-3 py-2 border rounded-lg shadow-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow">
              <option value="" disabled>Select Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
            <p v-if="errors.status" class="text-xs text-rose-600 mt-1 font-medium">{{ errors.status }}</p>
          </div>

          <div>
            <label for="priority" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Priority *</label>
            <select
              id="priority"
              v-model="form.priority"
              :class="[errors.priority ? 'border-rose-400' : 'border-slate-200']"
              class="w-full px-3 py-2 border rounded-lg shadow-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow">
              <option value="" disabled>Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <p v-if="errors.priority" class="text-xs text-rose-600 mt-1 font-medium">{{ errors.priority }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="startDate" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Start Date</label>
            <input
              id="startDate"
              type="date"
              v-model="form.startDate"
              class="w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            />
          </div>

          <div>
            <label for="dueDate" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Due Date</label>
            <input
              id="dueDate"
              type="date"
              v-model="form.dueDate"
              :class="[errors.dueDate ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-indigo-500']"
              class="w-full px-3 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 transition-shadow"
            />
            <p v-if="errors.dueDate" class="text-xs text-rose-600 mt-1 font-medium">{{ errors.dueDate }}</p>
          </div>
        </div>
      </form>

      <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          @click="handleSubmit"
          class="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
        >
          {{ isEditMode ? 'Save Changes' : 'Create Project' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const isEditMode = computed(() => !!props.project)

// Default empty scaffold model
const form = ref({
  id: null,
  clientName: '',
  projectName: '',
  description: '',
  status: 'Planning',
  priority: 'Medium',
  startDate: '',
  dueDate: ''
})

const errors = ref({})

// Hydrate fields if matching edit mode context parameters exist
onMounted(() => {
  if (isEditMode.value) {
    form.value = { ...props.project }
  }
})

// Comprehensive Form Validation Suite Engine
const validateForm = () => {
  const localErrors = {}
  
  if (!form.value.clientName?.trim()) {
    localErrors.clientName = 'Client name is required.'
  }
  
  if (!form.value.projectName?.trim()) {
    localErrors.projectName = 'Project name is required.'
  }
  
  if (!form.value.status) {
    localErrors.status = 'You must designate a status phase.'
  }
  
  if (!form.value.priority) {
    localErrors.priority = 'Priority metric designation is required.'
  }

  // Cross-Field Chronological Date Range Validation Checker
  if (form.value.startDate && form.value.dueDate) {
    const start = new Date(form.value.startDate)
    const due = new Date(form.value.dueDate)
    
    if (due < start) {
      localErrors.dueDate = 'Due date cannot occur before the project start date.'
    }
  }

  errors.value = localErrors
  return Object.keys(localErrors).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('save', { ...form.value })
  }
}
</script>