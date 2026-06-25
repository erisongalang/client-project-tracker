<template>
  <div class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
    <div class="p-5 flex-1">
      <div class="flex items-start justify-between gap-4 mb-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 block truncate max-w-[70%]">
          {{ project.clientName }}
        </span>
        
        <span :class="priorityClasses[project.priority]" class="text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center">
          {{ project.priority }} Priority
        </span>
      </div>

      <h3 class="text-lg font-bold text-slate-900 line-clamp-1 mb-2">
        {{ project.projectName }}
      </h3>

      <p class="text-sm text-slate-500 line-clamp-2 mb-4">
        {{ project.description || 'No description provided.' }}
      </p>

      <div class="border-t border-slate-100 pt-4 grid grid-cols-2 gap-2 text-xs">
        <div>
          <p class="text-slate-400 font-medium">Start Date</p>
          <p class="text-slate-700 font-semibold mt-0.5">{{ formatDate(project.startDate) }}</p>
        </div>
        <div>
          <p class="text-slate-400 font-medium">Due Date</p>
          <p class="text-slate-700 font-semibold mt-0.5">{{ formatDate(project.dueDate) }}</p>
        </div>
      </div>
    </div>

    <div class="bg-slate-50 px-5 py-3 rounded-b-xl border-t border-slate-100 flex items-center justify-between">
      <span :class="statusClasses[project.status]" class="text-xs font-semibold px-2.5 py-1 rounded-md">
        {{ project.status }}
      </span>

      <div class="flex items-center gap-2">
        <button 
          @click="$emit('edit', project)"
          class="text-xs font-medium text-slate-600 hover:text-indigo-600 px-2 py-1 rounded transition-colors"
        >
          Edit
        </button>
        <button 
          @click="confirmDelete"
          class="text-xs font-medium text-rose-600 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

// Tailwind mapping configurations
const priorityClasses = {
  High: 'bg-rose-50 text-rose-700 border border-rose-100',
  Medium: 'bg-amber-50 text-amber-700 border border-amber-100',
  Low: 'bg-slate-100 text-slate-700 border border-slate-200'
}

const statusClasses = {
  'Planning': 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-amber-100 text-amber-800',
  'On Hold': 'bg-slate-200 text-slate-800',
  'Completed': 'bg-emerald-100 text-emerald-800'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const confirmDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: `You are about to permanently delete "${props.project.projectName}". This cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4F46E5',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
    background: '#ffffff',
    customClass: {
      popup: 'rounded-2xl border border-slate-200 shadow-xl font-sans'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Dispatch event to composable to remove data item
      emit('delete', props.project.id)
      
      // Secondary toast alert confirming success execution
      Swal.fire({
        title: 'Removed!',
        text: 'Project has been deleted successfully.',
        icon: 'success',
        confirmButtonColor: '#4F46E5',
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-2xl font-sans'
        }
      })
    }
  })
}
</script>