<template>
  <div class="card-list-bar">
    <div class="card-list-bar-search">
      <img src="../assets/search-icon.svg" loading="lazy" alt="Search SVG" />
      <input
        placeholder="Filter by title, author..."
        @input="updateFilters()"
        v-model="searchString"
      />
    </div>
    <div class="card-list-bar-order">
      <select id="orders" name="orders" @change="setOrder($event)">
        <template v-for="(option, index) in orders" :key="`${option}_${index}`">
          <option :value="option.value" :selected="option.selected">{{ option.label }}</option>
        </template>
      </select>
    </div>
    <div class="card-list-bar-year" @click="setFilterCheckbox()">
      <div class="checkbox" :class="{ checked: onlyCurrentYear }" />
      <span class="checkbox-text">Latest only</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Order, Filter } from '@/types'

const emit = defineEmits<{
  (e: 'order-set', option: Order): void
  (e: 'filter-set', option: Filter): void
}>()

const searchString = ref<string>('')
const orders = ref([
  { value: 0, label: 'All Results', entity: 'id', direction: 'asc', selected: true },
  { value: 1, label: 'Author (↑)', entity: 'author', direction: 'asc', selected: false },
  { value: 2, label: 'Datum (↑)', entity: 'dateAdded', direction: 'asc', selected: false },
  { value: 3, label: 'Datum (↓)', entity: 'dateAdded', direction: 'desc', selected: false },
] as Order[])
const onlyCurrentYear = ref<boolean>(false)

function setOrder(event: any) {
  if (event.target && event.target.value) {
    const newSelected = event.target.value
    if (orders.value && orders.value.length) {
      const newSelectedOption = orders.value.find((order) => +order.value === +newSelected)
      if (newSelectedOption !== undefined) {
        emit('order-set', newSelectedOption)
      }
    }
  }
}
function setFilterCheckbox() {
  onlyCurrentYear.value = !onlyCurrentYear.value
  updateFilters()
}
function updateFilters() {
  const currentFilter = {} as Filter
  currentFilter.searchString = searchString.value
  currentFilter.onlyCurrentYear = onlyCurrentYear.value
  emit('filter-set', currentFilter)
}
</script>
<style lang="scss" scoped>
.card-list-bar {
  background: white;
  width: calc(100% - 32px);
  margin-top: calc(-0.5 * (var(--padding-default)));
  margin-bottom: var(--padding-default);
  padding: 16px 16px;
  border-radius: var(--border-radius);

  .card-list-bar-search {
    display: flex;
    height: 30px;
    width: 212px;

    img {
      height: 30px;
    }

    input {
      margin-left: 8px;
      width: calc(212px - 8px - 30px);
    }
  }

  input,
  select {
    font-family: Lato, Helvetica, sans-serif;
    font-size: 17px;
    color: var(--text-color-accent);
    border: unset;
    outline: unset;
  }

  .card-list-bar-order {
    display: flex;
    margin: 32px 0;

    select {
      cursor: pointer;
      text-align: center;
      width: fit-content;
    }
  }

  .card-list-bar-year {
    display: flex;
    width: 212px;

    .checkbox {
      cursor: pointer;
      position: relative;
      width: 16px;
      height: 16px;
      background: var(--background);

      &.checked {
        &::before {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          padding-top: 10px;
          padding-left: 10px;
          background: var(--text-color-accent);
        }
      }
    }

    .checkbox-text {
      cursor: pointer;
      color: var(--text-color-accent);
      margin-left: 8px;
    }
  }
  @media (min-width: 620px) {    
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-list-bar-year,
    .card-list-bar-order {
      justify-content: center;
    }
    .card-list-bar-order {
      margin: 0;
    }
  }
}
</style>
