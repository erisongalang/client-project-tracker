import { ref, computed } from 'vue'
import initialData from '../data/test_data.json'

// Global state shared across components
const projects = ref([])
const loading = ref(false)
const error = ref(null)

export function useProjects() {
  
  // Simulate API fetch with loading and potential error states
  const fetchProjects = async () => {
    if (projects.value.length > 0) return // Already loaded
    
    loading.value = true
    error.value = null
    
    try {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      const stored = localStorage.getItem('agency_projects')
      if (stored) {
        projects.value = JSON.parse(stored)
      } else {
        projects.value = initialData
        saveToStorage()
      }
    } catch (err) {
      error.value = 'Failed to load projects. Please try again.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('agency_projects', JSON.stringify(projects.value))
  }

  // CRUD Actions
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(), // Simple unique ID generation
    }
    projects.value.unshift(newProject) // Put newest on top
    saveToStorage()
  }

  const updateProject = (updatedProject) => {
    const index = projects.value.findIndex(p => p.id === updatedProject.id)
    if (index !== -1) {
      projects.value[index] = { ...updatedProject }
      saveToStorage()
    }
  }

  const deleteProject = (id) => {
    projects.value = projects.value.filter(p => p.id !== id)
    saveToStorage()
  }

  // Dashboard Metrics
  const stats = computed(() => {
    const counts = { Planning: 0, 'In Progress': 0, 'On Hold': 0, Completed: 0, total: projects.value.length }
    projects.value.forEach(p => {
      if (counts[p.status] !== undefined) counts[p.status]++
    })
    return counts
  })

  return {
    projects,
    loading,
    error,
    stats,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject
  }
}