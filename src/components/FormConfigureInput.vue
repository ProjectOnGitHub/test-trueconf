<template>
  <label class="configure__label">
    {{ labelName }}
    <input
      :id="idName"
      :value="number"
      :min="minValue"
      :name="inputName"
      type="number"
      class="configure__input"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  props: {
    minValue: {
      type: Number,
      default: 0
    },
    number: {
      type: Number,
      default: 0
    },
    labelName: {
      type: String,
      default: ''
    },

    inputName: {
      type: String,
      default: ''
    },
    idName: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.configure {
  &__label {
    @include flexible(100%);
    box-sizing: border-box;
    border: 1px solid $borderColor;
    padding: 15px;
    border-radius: 5px;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
