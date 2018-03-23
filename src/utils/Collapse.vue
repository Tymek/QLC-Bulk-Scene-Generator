<template>
  <transition name="collapse">
    <slot></slot>
  </transition>
</template>

<style>
  .collapse-enter-active {
    transition: all 0.5s; 
    max-height: 200px;
    overflow: hidden;
  }
  .collapse-leave-active {
    transition: all 0.5s; 
    max-height: 200px;
    overflow: hidden;
  }
  .collapse-enter, .collapse-leave-to {
    opacity: 0;
    max-height: 0px;
  }
</style>

<script>
export default {
  name: 'Collapse',
}
</script>
