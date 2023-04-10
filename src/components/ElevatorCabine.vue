<template>
  <div
    class="elevator"
    :style="transform"
    @transitionstart="$emit('transition-start')"
    @transitionend="$emit('transition-end')"
  >
    <div class="elevator__display">
      <span class="elevator__display-floor">{{ nextFloor }}</span>
      <span
        v-if="state !== 'move'"
        class="elevator__display-direction"
      >
        ⊙
      </span>
      <span
        v-else
        class="elevator__display-direction"
      >
        {{ direction }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nextFloor: {
      type: Number,
      default: 0
    },
    state: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: ''
    },
    transform: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.elevator {
  @include flexible(100%);
  justify-content: center;
  width: $shaftWidth;
  height: $floorHeight;
  position: absolute;
  background-color: $elevatorColor;
  padding: 5px;
  box-sizing: border-box;
  &_flash {
    animation: flash 3s linear infinite;
  }
  &__display {
    @include flexible(max-content);
    background-color: $displayColor;
    color: $textColor;
    font-weight: bold;
    height: max-content;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 5px;
    gap: 10px;
    align-items: center;
  }
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
