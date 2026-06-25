<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div>
            <h1 class="text-xl font-bold text-slate-900 leading-none">AgencyFlow</h1>
            <p class="text-xs text-slate-500 font-medium mt-0.5">Client Project Tracker</p>
          </div>
        </div>

        <button
          @click="openCreateModal"
          class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-150"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <DashboardStats v-if="!loading && !error" />
      <ProjectFilters v-if="!loading && !error" v-model="filters" />

      <div v-if="loading" class="flex flex-col items-center justify-center py-24">
        <div class="relative w-12 h-12">
          <div class="absolute w-12 h-12 rounded-full border-4 border-slate-200"></div>
          <div class="absolute w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
        <p class="text-sm font-semibold text-slate-600 mt-4 tracking-wide">Syncing client tracker database...</p>
      </div>

      <div v-else-if="error" class="max-w-md mx-auto bg-white border border-rose-100 rounded-2xl shadow-xl p-6 my-12 text-center">
        <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-slate-950">Data Stream Failed</h3>
        <p class="text-sm text-slate-500 mt-1 mb-6">{{ error }}</p>
        <button 
          @click="fetchProjects" 
          class="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm py-2 px-4 rounded-xl transition-colors"
        >
          Re-establish Connection
        </button>
      </div>

      <div v-else-if="filteredProjects.length === 0" class="bg-white border border-slate-200 rounded-2xl shadow-sm p-16 text-center">
        <div class="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-slate-900">No project matches found</h3>
        <p class="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-6">
          Your current filters yielded zero results. Try adjusting your search queries, clearing your filters, or create a brand new tracker track entry.
        </p>
        <button 
          @click="clearFilters" 
          class="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id" 
          :project="project" 
          @edit="openEditModal"
          @delete="deleteProject"
        />
      </div>
    </main>

    <ProjectForm 
      v-if="isModalOpen" 
      :project="selectedProject" 
      @close="closeModal" 
      @save="handleSaveProject"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjects } from './composables/useProjects'
import Swal from 'sweetalert2'
import DashboardStats from './components/Dashboard.vue'
import ProjectFilters from './components/ProjectFilters.vue'
import ProjectCard from './components/ProjectCard.vue'
import ProjectForm from './components/ProjectForm.vue'

// Load operational global app engine composable
const { projects, loading, error, fetchProjects, addProject, updateProject, deleteProject } = useProjects()

// Local operational filters state container
const filters = ref({
  search: '',
  status: '',
  priority: '',
  sortBy: 'dueDate-asc'
})

// Modal visibility management
const isModalOpen = ref(false)
const selectedProject = ref(null)

// Initialize Simulated API Load Execution Sequence
onMounted(() => {
  fetchProjects()
})

// Sorting weight mapping for deterministic priority orders
const priorityWeights = { High: 3, Medium: 2, Low: 1 }

// Reactive Filter Pipeline Calculation Engine
const filteredProjects = computed(() => {
  return projects.value
    .filter(project => {
      const matchesSearch = 
        project.projectName.toLowerCase().includes(filters.value.search.toLowerCase()) ||
        project.clientName.toLowerCase().includes(filters.value.search.toLowerCase())
      
      const matchesStatus = !filters.value.status || project.status === filters.value.status
      const matchesPriority = !filters.value.priority || project.priority === filters.value.priority
      
      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      switch (filters.value.sortBy) {
        case 'dueDate-asc':
          return new Date(a.dueDate) - new Date(b.dueDate)
        case 'dueDate-desc':
          return new Date(b.dueDate) - new Date(a.dueDate)
        case 'clientName-asc':
          return a.clientName.localeCompare(b.clientName)
        case 'priority-desc':
          return priorityWeights[b.priority] - priorityWeights[a.priority]
        default:
          return 0
      }
    })
})

// Workflow Action Handler Dispatches
const openCreateModal = () => {
  selectedProject.value = null
  isModalOpen.value = true
}

const openEditModal = (project) => {
  selectedProject.value = { ...project }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedProject.value = null
}

const handleSaveProject = (formModelData) => {
  if (formModelData.id) {
    // EDIT WORKFLOW: Ask for confirmation first before saving
    Swal.fire({
      title: 'Save changes?',
      text: `Are you sure you want to update the details for "${formModelData.projectName}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4F46E5', 
      cancelButtonColor: '#64748B',  
      confirmButtonText: 'Yes, save changes',
      cancelButtonText: 'Keep editing',
      customClass: {
        popup: 'rounded-2xl font-sans'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed: commit changes to state/localStorage
        updateProject(formModelData)
        closeModal()

        // Show success confirmation toast
        Swal.fire({
          title: 'Updated!',
          text: 'Project details have been successfully updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl font-sans'
          }
        })
      }
      // If cancelled, the modal stays open so they don't lose their inputs
    })

  } else {
    // CREATE WORKFLOW: Direct submission is standard here since they filled out a blank form
    addProject(formModelData)
    closeModal()
    
    Swal.fire({
      title: 'Success!',
      text: `"${formModelData.projectName}" has been successfully created.`,
      icon: 'success',
      timer: 1800,
      showConfirmButton: false,
      confirmButtonColor: '#4F46E5',
      customClass: {
        popup: 'rounded-2xl font-sans'
      }
    })
  }
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    priority: '',
    sortBy: 'dueDate-asc'
  }
}
</script>