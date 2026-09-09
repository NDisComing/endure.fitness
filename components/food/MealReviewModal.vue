<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MealItem } from '~/composables/useEndureStore'

const props = defineProps<{
  imageUrl: string
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  initialItems: MealItem[]
  coachTip?: string
}>()

const emit = defineEmits<{
  (e: 'save', payload: {
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
    image_url: string
    items: MealItem[]
    total_calories: number
    total_protein: number
    total_carbs: number
    total_fat: number
    coach_comment?: string
  }): void
  (e: 'cancel'): void
}>()

const editableItems = ref<MealItem[]>(JSON.parse(JSON.stringify(props.initialItems)))
const selectedMealType = ref(props.mealType)

// Dynamic calculation based on user gram adjustments
const computedTotals = computed(() => {
  return editableItems.value.reduce(
    (acc, item) => {
      acc.calories += Math.round(item.calories || 0)
      acc.protein += Math.round(item.protein || 0)
      acc.carbs += Math.round(item.carbs || 0)
      acc.fat += Math.round(item.fat || 0)
      return acc
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )
})

// Update item grams and recalculate proportional macros
const updateGrams = (index: number, newGrams: number) => {
  const item = editableItems.value[index]
  if (!item || newGrams <= 0) return
  const ratio = newGrams / (item.grams || 1)
  item.calories = Math.round(item.calories * ratio)
  item.protein = Math.round(item.protein * ratio)
  item.carbs = Math.round(item.carbs * ratio)
  item.fat = Math.round(item.fat * ratio)
  item.grams = newGrams
}

const removeItem = (index: number) => {
  editableItems.value.splice(index, 1)
}

const newItemName = ref('')
const newItemGrams = ref(100)
const newItemCals = ref(120)
const newItemPro = ref(10)
const newItemCarb = ref(10)
const newItemFat = ref(2)
const showAddRow = ref(false)

const addItem = () => {
  if (!newItemName.value) return
  editableItems.value.push({
    name: newItemName.value,
    grams: newItemGrams.value,
    calories: newItemCals.value,
    protein: newItemPro.value,
    carbs: newItemCarb.value,
    fat: newItemFat.value
  })
  newItemName.value = ''
  showAddRow.value = false
}

const handleSave = () => {
  emit('save', {
    mealType: selectedMealType.value,
    image_url: props.imageUrl,
    items: editableItems.value,
    total_calories: computedTotals.value.calories,
    total_protein: computedTotals.value.protein,
    total_carbs: computedTotals.value.carbs,
    total_fat: computedTotals.value.fat,
    coach_comment: props.coachTip || 'AI Verified macro entry'
  })
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" @click="emit('cancel')"></div>

    <!-- Review Card -->
    <div class="relative w-full max-w-lg bg-brand-gray border border-brand-charcoal/15 rounded-3xl p-6 shadow-2xl z-10 max-h-[92vh] overflow-y-auto space-y-5">
      <!-- Header -->
      <div class="flex items-center justify-between pb-3 border-b border-brand-charcoal/10">
        <div>
          <span class="text-xs font-bold text-brand-accent uppercase tracking-wider">AI Scan Result</span>
          <h3 class="font-heading font-black text-xl uppercase tracking-tight text-brand-charcoal">
            Review & Adjust Plate
          </h3>
        </div>
        <button @click="emit('cancel')" class="text-brand-charcoal/60 hover:text-brand-charcoal p-1">
          <Icon name="ph:x-bold" class="w-5 h-5" />
        </button>
      </div>

      <!-- Meal Type & Image Snapshot -->
      <div class="flex gap-4 items-center bg-brand-dark rounded-2xl p-3 border border-brand-charcoal/10 shadow-sm">
        <img 
          :src="imageUrl" 
          alt="Scanned meal preview" 
          class="w-20 h-20 rounded-xl object-cover border border-brand-charcoal/10 shrink-0"
        />
        <div class="flex-grow space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs text-brand-charcoal/70 font-medium">Meal Category:</span>
            <select 
              v-model="selectedMealType"
              class="bg-brand-gray text-xs font-bold text-brand-accent border border-brand-charcoal/15 rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
          <p v-if="coachTip" class="text-[11px] text-brand-charcoal/80 italic leading-snug line-clamp-2">
            💡 "{{ coachTip }}"
          </p>
        </div>
      </div>

      <!-- Total Macro Banner -->
      <div class="grid grid-cols-4 gap-2 bg-brand-dark p-3.5 rounded-2xl border border-brand-accent/40 text-center shadow-sm">
        <div>
          <p class="text-[10px] uppercase font-bold text-brand-charcoal/60">Calories</p>
          <p class="font-heading font-black text-base text-brand-accent mt-0.5">{{ computedTotals.calories }}</p>
        </div>
        <div>
          <p class="text-[10px] uppercase font-bold text-brand-charcoal/60">Protein</p>
          <p class="font-heading font-black text-base text-sky-700 mt-0.5">{{ computedTotals.protein }}g</p>
        </div>
        <div>
          <p class="text-[10px] uppercase font-bold text-brand-charcoal/60">Carbs</p>
          <p class="font-heading font-black text-base text-amber-700 mt-0.5">{{ computedTotals.carbs }}g</p>
        </div>
        <div>
          <p class="text-[10px] uppercase font-bold text-brand-charcoal/60">Fat</p>
          <p class="font-heading font-black text-base text-rose-700 mt-0.5">{{ computedTotals.fat }}g</p>
        </div>
      </div>

      <!-- Editable Ingredient Items -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-brand-charcoal uppercase">Recognized Food Items</label>
          <button 
            @click="showAddRow = !showAddRow" 
            class="text-[11px] font-bold text-brand-accent hover:underline flex items-center gap-1"
          >
            <Icon name="ph:plus-circle-bold" class="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        <!-- Add Item Form -->
        <div v-if="showAddRow" class="p-3 rounded-xl bg-brand-dark border border-brand-charcoal/10 space-y-2 text-xs shadow-sm">
          <input 
            v-model="newItemName" 
            type="text" 
            placeholder="Item name (e.g. Olive oil 1 tsp)" 
            class="w-full bg-brand-gray border border-brand-charcoal/15 rounded-lg p-2 text-brand-charcoal focus:border-brand-accent focus:outline-none"
          />
          <div class="grid grid-cols-4 gap-2">
            <div>
              <span class="text-[9px] text-brand-charcoal/60">Grams</span>
              <input v-model.number="newItemGrams" type="number" class="w-full bg-brand-gray border border-brand-charcoal/15 p-1 rounded text-center text-brand-charcoal" />
            </div>
            <div>
              <span class="text-[9px] text-brand-charcoal/60">Kcal</span>
              <input v-model.number="newItemCals" type="number" class="w-full bg-brand-gray border border-brand-charcoal/15 p-1 rounded text-center text-brand-charcoal" />
            </div>
            <div>
              <span class="text-[9px] text-brand-charcoal/60">Pro (g)</span>
              <input v-model.number="newItemPro" type="number" class="w-full bg-brand-gray border border-brand-charcoal/15 p-1 rounded text-center text-brand-charcoal" />
            </div>
            <div>
              <span class="text-[9px] text-brand-charcoal/60">Carb (g)</span>
              <input v-model.number="newItemCarb" type="number" class="w-full bg-brand-gray border border-brand-charcoal/15 p-1 rounded text-center text-brand-charcoal" />
            </div>
          </div>
          <button @click="addItem" class="w-full bg-brand-accent text-white font-bold py-1.5 rounded-lg shadow-sm">
            Insert Item
          </button>
        </div>

        <!-- Items Rows -->
        <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
          <div 
            v-for="(item, idx) in editableItems" 
            :key="idx"
            class="bg-brand-dark border border-brand-charcoal/10 rounded-xl p-3 flex items-center justify-between gap-3 text-xs shadow-sm"
          >
            <div class="flex-1">
              <input 
                v-model="item.name"
                class="bg-transparent font-bold text-brand-charcoal text-xs w-full focus:outline-none focus:text-brand-accent"
              />
              <div class="flex gap-2 text-[10px] text-brand-charcoal/70 mt-1 font-mono">
                <span class="text-brand-charcoal font-bold">{{ item.calories }} kcal</span>
                <span>•</span>
                <span class="text-sky-700 font-bold">P: {{ item.protein }}g</span>
                <span>•</span>
                <span class="text-amber-700 font-bold">C: {{ item.carbs }}g</span>
                <span>•</span>
                <span class="text-rose-700 font-bold">F: {{ item.fat }}g</span>
              </div>
            </div>

            <!-- Grams Adjuster -->
            <div class="flex items-center gap-1.5 shrink-0">
              <input 
                type="number"
                :value="item.grams"
                @change="(e: any) => updateGrams(idx, parseInt(e.target.value))"
                class="w-16 bg-brand-gray border border-brand-charcoal/15 text-center font-mono font-bold text-brand-charcoal rounded-lg py-1 px-1 text-xs focus:outline-none focus:border-brand-accent"
              />
              <span class="text-brand-charcoal/60 text-[10px]">g</span>
              <button 
                @click="removeItem(idx)" 
                class="text-brand-charcoal/40 hover:text-red-600 p-1 ml-1"
                title="Remove Item"
              >
                <Icon name="ph:trash-bold" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-end gap-3 pt-2">
        <button 
          @click="emit('cancel')"
          class="px-4 py-2.5 rounded-xl text-xs font-bold text-brand-charcoal/70 hover:text-brand-charcoal"
        >
          Discard
        </button>
        <button 
          @click="handleSave"
          class="bg-brand-accent text-white font-heading font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-brand-charcoal transition-all shadow-[0_4px_15px_rgba(250,129,18,0.35)] active:scale-95 flex items-center gap-1.5"
        >
          <Icon name="ph:check-bold" class="w-4 h-4" />
          <span>Save To Diary</span>
        </button>
      </div>
    </div>
  </div>
</template>
