<template>
  <li class="floor">
    <div class="floor__container">
      <span class="floor__number">
        {{ floor }}
      </span>
      <button
        class="floor__button"
        @click="$emit('add-floor')"
      >
        <span
          class="floor__button-indicator"
          :class="buttonStatus"
        ></span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    floor: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },

    buttonStatus: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.floor {
  @include gridable(100%);
  align-items: center;
  height: $floorHeight;
  box-sizing: border-box;
  border-bottom: 1px solid $borderColor;
  padding-left: 10px;
  &:first-child {
    border-bottom: none;
  }
  &__container {
    @include gridable(max-content);
    gap: 5px;
  }
  &__button {
    @include flexible(20px);
    @include button;
    height: 20px;
    border: 1px solid $borderColor;
    border-radius: 3px;
    &:disabled {
      cursor: default;
    }
    &-indicator {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid $borderColor;
      background-color: rgba($buttonColorDefault, 0.5);
      transition: all 0.5s linear;
      &:hover {
        background-color: rgba($buttonColorDisable, 0.5);
      }
      &_disabled {
        background-color: rgba($buttonColorDisable, 1);
      }
    }
  }
}
</style>
