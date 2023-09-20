<template>
  <div class="card-list">
    <CardListBar @filter-set="setFilter($event)" @order-set="setOrder($event)" />
    <div class="card-list-grid">
      <CardItem v-for="(card, index) in cardData" :key="`${card.id}_${index}`" :data="card" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CardItemType, Order, Filter } from '@/types'
import CardListBar from '@/components/CardListBar.vue'
import CardItem from '@/components/CardItem.vue'
import { ref } from 'vue'
import apiResponse from '@/api/response.json'
// api über localhost nicht erreichbar, daher hier direkt der response. (CORS ERR)
const cardData = ref(apiResponse.payload.data as Array<CardItemType>)

function setFilter(filter: Filter) {
  resetFilter()
  cardData.value = cardData.value?.filter((cardItem: CardItemType) => {
    if (filter.onlyCurrentYear) {
      const dateObject = cardItem.dateAdded.split('-')
      const cartItemYear = dateObject[0]
      const currentYear = new Date().getFullYear()
      if (!(+cartItemYear === +currentYear)) {
        return false
      }
    }
    return searchStringMatching(cardItem, filter.searchString)
  })
}
function searchStringMatching(cardItem: CardItemType, searchString: string): boolean {
  if (searchString !== '') {
    const author = cardItem.author.toLowerCase()
    const title = cardItem.title.toLowerCase()
    if (!(author.includes(searchString.toLowerCase()) || title.includes(searchString.toLowerCase()))) {
      return false
    }
  }
  return true
}
function resetFilter() {
  cardData.value = apiResponse.payload.data as Array<CardItemType>
}
function setOrder(orderObject: Order) {
  cardData.value = cardData.value?.sort((next: CardItemType, current: CardItemType) => {
    const entity = orderObject.entity
    switch (entity) {
      case 'author':
        return sort(current.author, next.author, orderObject.direction)
      case 'dateAdded':
        return sort(current.dateAdded, next.dateAdded, orderObject.direction)
      case 'id':
        return sort(current.id, next.id, orderObject.direction)
    }
    return 1
  })
}

function sort(current: string | number, next: string | number, direction: string) {
  if (direction === 'asc') {
    return current < next ? 1 : -1
  }
  if (direction === 'desc') {
    return current > next ? 1 : -1
  }
  return 1
}
</script>
<style lang="scss" scoped>
.card-list {
  max-width: 920px;
  min-width: calc(320px - (var(--padding-default)*2));
  margin: auto;
  padding: 0 var(--padding-default) var(--padding-default) var(--padding-default);
}
.card-list-grid {
  display: grid;
  grid-template-columns: repeat(1, calc(100%  - var(--padding-default)));
  gap: var(--padding-default) calc((var(--padding-default) / 2));

  @media (min-width: 620px) {
    grid-template-columns: repeat(2, calc(50% - var(--padding-default) / 4));
  }

  @media (min-width: 820px) {
    grid-template-columns: repeat(3, calc(33.3% - var(--padding-default) / 3));
  }
}
</style>
