<template>
  <form class="configure">
    <slot></slot>
    <button
      id="id-reset-settings-button"
      class="configure__button"
      name="reset-settings-button"
      @click="$emit('click-to-button')"
    >
      Reset to default
    </button>
  </form>
</template>

<script>
export default {
  props: {
    minFloors: {
      type: Number,
      default: 0
    },
    numberFloors: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.configure {
  @include flexible(max-content);
  flex-direction: column;
  justify-items: right;
  gap: 15px;
  box-sizing: border-box;
  &__label {
    @include flexible(100%);
    box-sizing: border-box;
    border: 1px solid $borderColor;
    padding: 15px;
    border-radius: 5px;
    flex-direction: column;
    gap: 10px;
  }
  &__button {
    @include flexible(max-content);
    @include button;
    padding: 5px;
    border: 1px solid $borderColor;
    border-radius: 5px;
    align-self: flex-end;
  }
}
</style>
