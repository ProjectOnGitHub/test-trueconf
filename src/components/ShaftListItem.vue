<template>
  <li class="shaft__item"></li>
</template>

<style lang="scss" scoped>
.shaft__item {
  height: $floorHeight;
  width: $shaftWidth;
  box-sizing: border-box;
  border-bottom: 1px solid $borderColor;
  &:first-child {
    border-bottom: none;
  }
}
</style>
