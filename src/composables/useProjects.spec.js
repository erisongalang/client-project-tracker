import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProjects } from './useProjects'

vi.mock('../data/test_data.json', () => ({
  default: [
    { id: 1, projectName: 'Alpha', clientName: 'Acme', status: 'Planning', priority: 'High', startDate: '2026-01-01', dueDate: '2026-02-01' },
    { id: 2, projectName: 'Beta', clientName: 'Stark', status: 'In Progress', priority: 'Medium', startDate: '2026-01-10', dueDate: '2026-03-01' }
  ]
}))

describe('useProjects Composable Unit Test Suite', () => {
  beforeEach(() => {
    // Clear localStorage and reset global reactive states before each single test block
    localStorage.clear()
    vi.clearAllMocks()
    
    // Force reset the shared global state inside the composable
    const { projects, error, loading } = useProjects()
    projects.value = []
    error.value = null
    loading.value = false
  })

  it('should hydrate projects list from fallback mock data if localStorage is completely empty', async () => {
    const { projects, fetchProjects } = useProjects()
    
    expect(projects.value.length).toBe(0)
    await fetchProjects()
    
    expect(projects.value.length).toBe(2)
    expect(projects.value[0].projectName).toBe('Alpha')
  })

  it('should calculate accurate dashboard summary counts reactively based on project status', async () => {
    const { fetchProjects, stats } = useProjects()
    await fetchProjects()

    expect(stats.value.total).toBe(2)
    expect(stats.value['Planning']).toBe(1)
    expect(stats.value['In Progress']).toBe(1)
    expect(stats.value['Completed']).toBe(0)
  })

  it('should add a brand new tracker track entry to the top of the deck', async () => {
    const { projects, fetchProjects, addProject, stats } = useProjects()
    await fetchProjects()

    const initialCount = projects.value.length

    addProject({
      projectName: 'Gamma Wave',
      clientName: 'Wayne Enterprises',
      status: 'Completed',
      priority: 'Low',
      startDate: '2026-05-01',
      dueDate: '2026-06-01'
    })

    expect(projects.value.length).toBe(initialCount + 1)
    expect(projects.value[0].projectName).toBe('Gamma Wave')
    expect(stats.value['Completed']).toBe(1)
  })

  it('should cleanly drop a project tracker block out of the array on delete actions', async () => {
    const { projects, fetchProjects, deleteProject } = useProjects()
    await fetchProjects()

    const initialCount = projects.value.length
    const targetIdToRemove = projects.value[0].id

    deleteProject(targetIdToRemove)

    expect(projects.value.length).toBe(initialCount - 1)
    expect(projects.value.find(p => p.id === targetIdToRemove)).toBeUndefined()
  })
})