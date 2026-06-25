<template>
  <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-sm font-medium text-slate-500">Total Projects</p>
      <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats.total }}</p>
    </div>

    <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100 shadow-sm">
      <p class="text-sm font-medium text-blue-600">Planning</p>
      <p class="text-2xl font-bold text-blue-900 mt-1">{{ stats.Planning }}</p>
    </div>

    <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-100 shadow-sm">
      <p class="text-sm font-medium text-amber-600">In Progress</p>
      <p class="text-2xl font-bold text-amber-900 mt-1">{{ stats['In Progress'] }}</p>
    </div>

    <div class="bg-slate-100/60 p-4 rounded-xl border border-slate-200 shadow-sm">
      <p class="text-sm font-medium text-slate-600">On Hold</p>
      <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats['On Hold'] }}</p>
    </div>

    <div class="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 shadow-sm">
      <p class="text-sm font-medium text-emerald-600">Completed</p>
      <p class="text-2xl font-bold text-emerald-900 mt-1">{{ stats.Completed }}</p>
    </div>
  </div>
</template>

<script setup>
import { useProjects } from '../composables/useProjects'

const { stats } = useProjects()
</script>