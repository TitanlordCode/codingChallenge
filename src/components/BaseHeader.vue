<template>
  <div class="header">
    <div class="header-title">
      {{props.title}}
    </div>
  </div>    
</template>
<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  background: var(--primary-color-variant);
  color: white;
  height: 150px;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  min-width: 320px;
}
.header-title {
  padding: var(--padding-default)
}
</style>