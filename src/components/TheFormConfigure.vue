<template>
  <form class="configure">
    <label class="configure__label">
      Change floors
      <input
        id="id-change-floors"
        type="number"
        :value="numberFloors"
        :min="minFloors"
        class="configure__input"
        name="input-change-floors"
        @input="$emit('input', $event.target.value)"
      />
    </label>
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
  @include flexible(100%);
  flex-direction: column;
  gap: 5px;
  box-sizing: border-box;
  &__label {
    @include flexible(100%);
    align-items: center;
    gap: 10px;
  }
}
</style>
