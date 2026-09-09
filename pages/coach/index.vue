<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEndureStore, type Profile } from '~/composables/useEndureStore'

definePageMeta({
  layout: 'coach',
  middleware: ['auth']
})

useHead({
  title: 'Client CRM & Adherence Table | EndureFitness Admin',
  meta: [
    { name: 'description', content: 'Master client CRM roster with adherence tracking and nutrition target management.' }
  ]
})

const store = useEndureStore()

const searchQuery = ref('')
const selectedTierFilter = ref('all')
const editingClient = ref<Profile | null>(null)
const editSuccessMsg = ref('')

const filteredClients = computed(() => {
  return store.clientsList.value.filter(c => {
    const matchesSearch = c.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          c.phone_number?.includes(searchQuery.value)
    const matchesTier = selectedTierFilter.value === 'all' || c.membership_tier?.toLowerCase().includes(selectedTierFilter.value.toLowerCase())
    return matchesSearch && matchesTier
  })
})

const openTargetEditor = (client: Profile) => {
  editingClient.value = JSON.parse(JSON.stringify(client))
}

const saveTargets = () => {
  if (!editingClient.value) return
  store.updateClientTargets(editingClient.value.id, {
    target_calories: editingClient.value.target_calories,
    target_protein: editingClient.value.target_protein,
    target_carbs: editingClient.value.target_carbs,
    target_fat: editingClient.value.target_fat,
    injuries_notes: editingClient.value.injuries_notes
  })
  editSuccessMsg.value = `Updated targets for ${editingClient.value.full_name}`
  setTimeout(() => {
    editSuccessMsg.value = ''
    editingClient.value = null
  }, 1500)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Top CRM Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span class="text-xs font-bold text-brand-accent uppercase tracking-widest">Client Management CRM</span>
        <h1 class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
          Active Client Roster
        </h1>
      </div>

      <!-- Quick stats ticker -->
      <div class="flex items-center gap-3">
        <div class="bg-brand-gray border border-white/10 px-4 py-2 rounded-xl text-xs">
          <span class="text-gray-400 block text-[10px] uppercase font-bold">Average Adherence</span>
          <span class="font-heading font-black text-sm text-brand-accent">88.3%</span>
        </div>
        <div class="bg-brand-gray border border-white/10 px-4 py-2 rounded-xl text-xs">
          <span class="text-gray-400 block text-[10px] uppercase font-bold">Total Active</span>
          <span class="font-heading font-black text-sm text-white">{{ store.clientsList.value.length }} Clients</span>
        </div>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-brand-gray border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div class="relative w-full sm:w-80">
        <Icon name="ph:magnifying-glass-bold" class="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search client by name or phone..."
          class="w-full bg-brand-dark border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent"
        />
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <span class="text-xs text-gray-400 font-bold shrink-0">Filter Tier:</span>
        <select 
          v-model="selectedTierFilter"
          class="bg-brand-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
        >
          <option value="all">All Tiers</option>
          <option value="Hybrid">Hybrid Coaching</option>
          <option value="1-on-1">1-on-1 Mastery</option>
          <option value="12-Week">12-Week Transformation</option>
        </select>
      </div>
    </div>

    <!-- Master CRM Table -->
    <div class="bg-brand-gray border border-white/10 rounded-3xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-brand-dark/80 text-gray-400 uppercase font-bold text-[10px] border-b border-white/10 tracking-wider">
            <tr>
              <th class="py-3.5 px-6">Client Profile</th>
              <th class="py-3.5 px-4">Membership Tier</th>
              <th class="py-3.5 px-4">Adherence Score</th>
              <th class="py-3.5 px-4">Target Macros</th>
              <th class="py-3.5 px-4">Injuries / Notes</th>
              <th class="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr 
              v-for="client in filteredClients" 
              :key="client.id"
              class="hover:bg-white/[0.02] transition-colors"
            >
              <!-- Profile -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <img 
                    :src="client.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'" 
                    :alt="client.full_name"
                    class="w-10 h-10 rounded-xl object-cover border border-brand-accent/40"
                  />
                  <div>
                    <p class="font-heading font-bold text-sm text-white">{{ client.full_name }}</p>
                    <p class="text-[11px] text-gray-400 font-mono">{{ client.phone_number }}</p>
                  </div>
                </div>
              </td>

              <!-- Tier -->
              <td class="py-4 px-4">
                <span class="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-gray-200 font-medium whitespace-nowrap">
                  {{ client.membership_tier }}
                </span>
              </td>

              <!-- Adherence Score -->
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      class="h-full rounded-full transition-all"
                      :class="client.adherence_rate && client.adherence_rate >= 85 ? 'bg-brand-accent' : 'bg-amber-400'"
                      :style="{ width: `${client.adherence_rate || 75}%` }"
                    ></div>
                  </div>
                  <span 
                    class="font-mono font-bold text-xs"
                    :class="client.adherence_rate && client.adherence_rate >= 85 ? 'text-brand-accent' : 'text-amber-400'"
                  >
                    {{ client.adherence_rate || 75 }}%
                  </span>
                </div>
              </td>

              <!-- Macro Targets -->
              <td class="py-4 px-4 font-mono text-[11px]">
                <span class="text-brand-accent font-bold">{{ client.target_calories }} kcal</span>
                <span class="text-gray-400 block text-[10px]">
                  P: {{ client.target_protein }}g | C: {{ client.target_carbs }}g | F: {{ client.target_fat }}g
                </span>
              </td>

              <!-- Injury notes -->
              <td class="py-4 px-4 max-w-xs">
                <p class="text-gray-400 line-clamp-2 text-[11px]">
                  {{ client.injuries_notes || 'None noted' }}
                </p>
              </td>

              <!-- Actions -->
              <td class="py-4 px-6 text-right">
                <button 
                  @click="openTargetEditor(client)"
                  class="bg-brand-dark hover:bg-brand-accent hover:text-black border border-white/15 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all"
                >
                  Adjust Targets
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Target Drawer / Modal -->
    <div v-if="editingClient" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" @click="editingClient = null"></div>

      <div class="relative w-full max-w-lg bg-brand-gray border border-white/20 rounded-3xl p-6 shadow-2xl z-10 space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span class="text-xs font-bold text-brand-accent uppercase">Program Assignment</span>
            <h3 class="font-heading font-black text-xl text-white">
              {{ editingClient.full_name }} Targets
            </h3>
          </div>
          <button @click="editingClient = null" class="text-gray-400 hover:text-white">
            <Icon name="ph:x-bold" class="w-5 h-5" />
          </button>
        </div>

        <div v-if="editSuccessMsg" class="p-3 bg-brand-accent/20 border border-brand-accent text-brand-accent text-xs rounded-xl flex items-center gap-2">
          <Icon name="ph:check-circle-bold" class="w-4 h-4" />
          <span>{{ editSuccessMsg }}</span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-gray-400">Daily Calorie Target (kcal)</label>
            <input 
              v-model.number="editingClient.target_calories"
              type="number"
              class="w-full bg-brand-dark border border-white/15 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-gray-400">Daily Protein Floor (g)</label>
            <input 
              v-model.number="editingClient.target_protein"
              type="number"
              class="w-full bg-brand-dark border border-white/15 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-gray-400">Carbohydrates (g)</label>
            <input 
              v-model.number="editingClient.target_carbs"
              type="number"
              class="w-full bg-brand-dark border border-white/15 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent"
            />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-gray-400">Healthy Fats (g)</label>
            <input 
              v-model.number="editingClient.target_fat"
              type="number"
              class="w-full bg-brand-dark border border-white/15 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-[10px] uppercase font-bold text-gray-400">Biomechanics / Injury Restrictions Notes</label>
          <textarea 
            v-model="editingClient.injuries_notes"
            rows="3"
            class="w-full bg-brand-dark border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-accent"
          ></textarea>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button 
            @click="editingClient = null"
            class="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button 
            @click="saveTargets"
            class="bg-brand-accent text-black font-heading font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl hover:bg-white transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)]"
          >
            Save Target Protocol
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
