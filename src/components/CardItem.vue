<template>
  <div class="card-item">
    <img
      class="background-img portrait"
      :src="image"
      width="450px"
      height="450px"
      alt="image_alt"
    />
    <div class="card-item-info">
      <div class="card-item-info-header">
        <div class="credentials">
          <span>{{ credentials }}</span>
        </div>
        <div class="text">
          <div class="author">
            {{ props.data?.author }}
          </div>
          <div class="date">
            {{ date }}
          </div>
        </div>
      </div>
      <div class="cart-item-info-title">
        {{ props.data?.title }}
      </div>
      <div class="cart-item-info-interactions">
        <div class="like-button" :class="{ active: isActive }" @click.stop="likeItem">LIKE</div>
        <div class="like-info">
          <img src="../assets/heart-icon.svg" loading="lazy" alt="Heart SVG" />
          <span>{{ `${likes} likes` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import type { CardItemType, CartItemImage } from '@/types'
const props = defineProps({
  data: Object as PropType<CardItemType>
})

const likes = ref(props.data?.likes ? props.data.likes : 0)
const image = computed<string>(() => {
  const image = props.data?.images ? props.data?.images[0] : ({} as CartItemImage)
  return image.portrait[0]
})
const credentials = computed<string>(() => {
  const nameArray = props.data?.author.split(' ')
  let result = ''
  nameArray?.forEach((name) => {
    result += name[0]
  })
  return result
})
const date = computed<string>(() => {
  const ymd = props.data?.dateAdded ? props.data?.dateAdded : ''
  const dateObject = new Date(ymd)
  const monthName = getMonthName(dateObject)
  const day = dateObject.getDate()
  let result = ymd
  if (day && monthName) {
    result = `${day} ${monthName}`
  }
  return result
})
const isActive = computed<boolean>(() => {
  if (props.data && props.data.likes) {
    return props.data.likes < likes.value
  }
  return false
})

function getMonthName(date: Date) {
  const options = { month: 'long' } as Intl.DateTimeFormatOptions
  return new Intl.DateTimeFormat('de-DE', options).format(date)
}
function likeItem() {
  if (!isActive.value) {
    likes.value += 1
  } else {
    likes.value -= 1
  }
}
</script>
<style lang="scss" scoped>
.card-item {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin: 0px 16px;

  @media (min-width: 620px) {
    margin: 0px;
  }
}
.card-item-info {
  background: white;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  
  .card-item-info-header {
    display: flex;
  }
  .text {
    font-size: 12px;
    margin: auto 0px auto 4px;
    .author {
      font-weight: bold;
    }
    .date {
      color: var(--text-color-accent);
    }
  }
  .cart-item-info-title {
    font-weight: bold;
    margin: 16px 0;
  }
  .cart-item-info-interactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .like-button {
    cursor: pointer;
    padding: 4px 10px 1px 10px;
    color: var(--primary-color);
    background: white;
    border: 1px solid var(--primary-color);
    border-radius: var(--border-radius);

    &.active {
      color: white;
      background: var(--primary-color);
    }
    @media (min-width: 620px) {
      &:hover {
        color: white;
        background: var(--primary-color);
      }
    }
  }
  .like-info {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: var(--text-color-accent);
    img {
      width: 16px;
      height: 16px;
    }
    span {
      margin-left: 5px;
    }
  }
}
.credentials {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  width: fit-content;
  z-index: 1;
  color: white;
  width: 40px;
  height: 40px;
  span {
    margin-top: 2px;
  }
  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    padding-top: 40px;
    padding-left: 40px;
    background: var(--primary-color-variant);
    border-radius: 100%;
    z-index: -1;
  }
}
.background-img {
  object-fit: cover;
  z-index: -1;
  &.landscape {
    width: auto;
    height: 100%;
  }
  &.portrait {
    width: 100%;
    height: auto;
  }
}
</style>
