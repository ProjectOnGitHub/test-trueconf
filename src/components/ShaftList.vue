<template>
  <ul class="shaft">
    <slot></slot>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.shaft {
  @include flexible(100%);
  @include unmarkedList;
  flex-direction: column-reverse;
  border-left: 1px solid $borderColor;
  border-right: 1px solid $borderColor;
  position: relative;
}
</style>
